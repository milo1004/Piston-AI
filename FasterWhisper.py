import pyaudio
import numpy as np
from faster_whisper import WhisperModel
import warnings
import os

os.environ['PYGAME_HIDE_SUPPORT_PROMPT'] = '1'

# Silence the specific pkg_resources deprecation warning
warnings.filterwarnings("ignore", category=UserWarning, module='pygame.pkgdata')

import pygame
from pathlib import Path
import getpass
import platform

pygame.mixer.init()

# Load once (important)

modelSize = "small"
if platform.system() == "Windows":
    modelPath = fr"C:\Users\{getpass.getuser()}\.cache\huggingface\hub\models--Systran--faster-whisper-{modelSize}"
elif platform.system() in ("Linux", "Darwin"):
    modelPath = f"~/.cache/huggingface/hub/models--Systran--faster-whisper-{modelSize}"
else:
    modelPath = "/A/RANDOM/PATH"

if not Path(modelPath).exists():
    print(f"Downloading model \"{modelPath}\"...")
    try:
        model = WhisperModel(
            modelSize,
            compute_type="float16"
        )
    except Exception as e:
        if e == "Requested float16 compute type, but the target device or backend do not support efficient float16 computation.":
            model = WhisperModel(
                modelSize,
                compute_type="int8"
            )
else:
    print("Loading model...")
    try:
        model = WhisperModel(
            modelSize,
            compute_type="int8"
        )
    except Exception as e:
        if e == "Requested float16 compute type, but the target device or backend do not support efficient float16 computation.":
            print("Failed to load int8 model")

RATE = 16000
CHUNK = 1024
SECONDS = 4 # rolling window length

def rms(data:bytes) -> float:
    samples = np.frombuffer(data, np.int16).astype(np.float32)
    return np.sqrt(np.mean(samples ** 2))


def listen_and_transcribe(device_index=None,wakewords:list=None, SILENCE_THRESHOLD:int=350,SILENCE_DURATION:float=3.3) -> str | None:
    audio = pyaudio.PyAudio()
    if not wakewords or wakewords == []:
        prompt = None
        hotwords = None
    else:
        prompt = f"The user might have said: {', '.join(wakewords)}"
        hotwords = ", ".join(wakewords)

    stream = audio.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=RATE,
        input=True,
        input_device_index=device_index,
        frames_per_buffer=CHUNK
    )

    frames = []
    silent_chunks = 0
    max_silent_chunks = int(SILENCE_DURATION * RATE / CHUNK)

    while True:
        data = stream.read(CHUNK, exception_on_overflow=False)
        volume = rms(data)

        frames.append(data)

        if volume < SILENCE_THRESHOLD:
            silent_chunks += 1
        else:
            silent_chunks = 0

        if silent_chunks >= max_silent_chunks and len(frames) > 10:
            break

    stream.stop_stream()
    stream.close()
    audio.terminate()

    # Convert to numpy float32
    audio_np = np.frombuffer(b"".join(frames), np.int16).astype(np.float32) / 32768.0

    segments, _ = model.transcribe(
        audio_np,
        language="en",
        vad_filter=True,
        hotwords=hotwords,
        initial_prompt=prompt
    )

    text = "".join(seg.text for seg in segments).strip()
    return text if text else ""

def startSFX(path:str="SFX/STTstart.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def stopSFX(path:str="SFX/STTstop.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def errorSFX(path:str="SFX/STTerror.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def startupSFX(path:str="SFX/Sysstart.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()