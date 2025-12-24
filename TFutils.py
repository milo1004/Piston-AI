import pyaudio
import numpy as np
import tensorflow as tf
import librosa
import time

RATE = 16000
N_MELS = 40
N_FFT = 400
HOP_LENGTH = 160
TARGET_FRAMES = 100

def _fix_length(mel, target_frames=TARGET_FRAMES):
    if mel.shape[1] > target_frames:
        return mel[:, :target_frames]
    pad = target_frames - mel.shape[1]
    return np.pad(mel, ((0, 0), (0, pad)), mode="constant")


def ListenForWW(
    modelPath="data/openwakeword/wakeword.tflite",
    threshold=0.75,
    rate=RATE,
    window_seconds=1.0,
    chunk=1024,
    debounce=1.0,
):
    interpreter = tf.lite.Interpreter(model_path=modelPath)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    n_samples = int(rate * window_seconds)
    buffer = np.zeros(n_samples, dtype=np.float32)

    pa = pyaudio.PyAudio()
    stream = pa.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=rate,
        input=True,
        frames_per_buffer=chunk,
    )

    print("🎧 Listening for wake word...")

    last_trigger = 0.0
    scores = []
    SMOOTH = 5

    try:
        while True:
            data = stream.read(chunk, exception_on_overflow=False)
            audio = np.frombuffer(data, dtype=np.int16).astype(np.float32) / 32768.0

            buffer = np.roll(buffer, -len(audio))
            buffer[-len(audio):] = audio

            # ===== RMS energy gate (BEFORE inference) =====
            rms = np.sqrt(np.mean(buffer ** 2))
            if rms < 0.01:
                scores.clear()
                continue

            mel = librosa.feature.melspectrogram(
                y=buffer,
                sr=rate,
                n_mels=N_MELS,
                n_fft=N_FFT,
                hop_length=HOP_LENGTH,
            )

            mel = librosa.power_to_db(mel, ref=np.max)
            mel = np.clip(mel, -80, 0)
            mel = _fix_length(mel)
            mel = mel[np.newaxis, ..., np.newaxis].astype(np.float32)

            interpreter.set_tensor(input_details[0]["index"], mel)
            interpreter.invoke()

            score = float(interpreter.get_tensor(output_details[0]["index"])[0][0])

            scores.append(score)
            scores = scores[-SMOOTH:]
            avg_score = sum(scores) / len(scores)

            now = time.time()
            if avg_score >= threshold and (now - last_trigger) > debounce:
                print(f"🔥 Wake word detected ({avg_score:.2f})")
                last_trigger = now
                return avg_score

    finally:
        stream.stop_stream()
        stream.close()
        pa.terminate()
