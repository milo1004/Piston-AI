import os
import shutil
import threading
import wave
from pathlib import Path

import numpy as np
import pyaudio
import librosa
import tensorflow as tf

import platform
import sys

# =====================
# CONFIG
# =====================
RATE = 16000
CHANNELS = 1
FORMAT = pyaudio.paInt16
CHUNK = 1024
RECORDINGS = 5

POS_DIR = "data/openwakeword/positive"
NEG_DIR = "data/openwakeword/negative"
FEATURE_DIR = "data/openwakeword/features"
MODEL_DIR = "data/openwakeword/wakeword_model"
TFLITE_PATH = "data/openwakeword/wakeword.tflite"

N_MELS = 40
HOP_LENGTH = 160
N_FFT = 400
TARGET_FRAMES = 100   # ~1 second

# =====================
# RECORDING
# =====================
def record_until_enter(filename):
    audio = pyaudio.PyAudio()
    stream = audio.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK
    )

    frames = []
    stop_flag = threading.Event()

    def wait_for_enter():
        input()
        stop_flag.set()

    print("🔴 Recording... press ENTER to stop")
    threading.Thread(target=wait_for_enter, daemon=True).start()

    while not stop_flag.is_set():
        frames.append(stream.read(CHUNK, exception_on_overflow=False))

    stream.stop_stream()
    stream.close()
    audio.terminate()

    with wave.open(filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b"".join(frames))


# =====================
# FEATURE UTILS
# =====================
def fix_length(mel, target_frames=TARGET_FRAMES):
    if mel.shape[1] > target_frames:
        return mel[:, :target_frames]
    pad = target_frames - mel.shape[1]
    return np.pad(mel, ((0, 0), (0, pad)), mode="constant")


def process_folder(folder, label):
    X, y = [], []

    for f in os.listdir(folder):
        if not f.endswith(".wav"):
            continue

        audio, _ = librosa.load(
            os.path.join(folder, f),
            sr=RATE,
            mono=True
        )

        mel = librosa.feature.melspectrogram(
            y=audio,
            sr=RATE,
            n_mels=N_MELS,
            hop_length=HOP_LENGTH,
            n_fft=N_FFT
        )
        mel = librosa.power_to_db(mel)
        mel = fix_length(mel)

        X.append(mel)
        y.append(label)

    return X, y


# =====================
# MAIN
# =====================
if __name__ == "__main__":

    # Reset dirs
    os.makedirs(POS_DIR, exist_ok=True)
    os.makedirs(NEG_DIR, exist_ok=True)
    shutil.rmtree(FEATURE_DIR, ignore_errors=True)
    os.makedirs(FEATURE_DIR)

    # ---- Record positives ----
    for i in range(1, RECORDINGS + 1):
        print(f"\n🎤 Sample {i}/{RECORDINGS}")
        print("Say \"Hey Piston\" naturally.")
        input("Press ENTER to start...")
        path = f"{POS_DIR}/pos_{i:03d}.wav"
        record_until_enter(path)
        print(f"✅ Saved {path}")

    print("\n🎉 All positive samples recorded!")

    # ---- Feature extraction ----
    print("\n⚙️ Extracting features...")
    Xp, yp = process_folder(POS_DIR, 1)
    Xn, yn = process_folder(NEG_DIR, 0)

    X = np.array(Xp + Xn)
    y = np.array(yp + yn)

    X = X[..., np.newaxis]  # (N, 40, 100, 1)

    np.save(f"{FEATURE_DIR}/X.npy", X)
    np.save(f"{FEATURE_DIR}/y.npy", y)

    print("Features:", X.shape)
    print("Positives:", y.sum(), "Negatives:", len(y) - y.sum())

    # ---- Model ----
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(16, (3,3), activation="relu", input_shape=X.shape[1:]),
        tf.keras.layers.MaxPooling2D((2,2)),
        tf.keras.layers.Conv2D(32, (3,3), activation="relu"),
        tf.keras.layers.MaxPooling2D((2,2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(64, activation="relu"),
        tf.keras.layers.Dense(1, activation="sigmoid")
    ])

    model.compile(
        optimizer="adam",
        loss="binary_crossentropy",
        metrics=["accuracy"]
    )

    model.fit(
        X, y,
        epochs=20,
        batch_size=16,
        validation_split=0.2,
        shuffle=True
    )

    # ---- Export ----
    shutil.rmtree(MODEL_DIR, ignore_errors=True)
    model.export(MODEL_DIR)

    converter = tf.lite.TFLiteConverter.from_saved_model(MODEL_DIR)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()

    with open(TFLITE_PATH, "wb") as f:
        f.write(tflite_model)

    print("\n✅ Wakeword model exported!")
    print("Model path:", TFLITE_PATH)

    if platform.system() == "Windows":
        print(f"Use \"python main.py\" to start Piston AI.")
    elif platform.system() == "Linux":
        print(f" Use \"source venv/bin/activate && python main.py\" to start Piston AI.")