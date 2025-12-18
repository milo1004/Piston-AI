
import json, queue, os, shutil
from pathlib import Path


try:
    import pygame
except ModuleNotFoundError:
    os.system("pip install pygame")
    import pygame
try:
    import requests
except ModuleNotFoundError:
    os.system("pip install requests")
    import requests

try:
    import vosk
except ModuleNotFoundError:
    os.system("pip install vosk")
    import vosk

try:
    import sounddevice as sd
except ModuleNotFoundError:
    os.system("pip install sounddevice")
    import sounddevice as sd

pygame.init()
pygame.mixer.init()

q = queue.Queue()

def callback(indata, frames, time, status):
    if status:
        print(status, flush=True)
    q.put(bytes(indata))

def downloadModel(url:str="https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"):
    response = requests.get(url)
    response.raise_for_status()

    with open("VOSK.zip","wb") as f:
        try:
            f.write(response.content)
            return True
        except Exception as e:
            return e

def extractModel(path="VOSK.zip", destination="VOSK"):
    try:
        shutil.unpack_archive(path, destination)

        dest = Path(destination)
        subdirs = [p for p in dest.iterdir() if p.is_dir()]
        if not subdirs:
            return "No model directory found"

        model_dir = subdirs[0]

        shutil.move(str(model_dir), destination + "_model")
        shutil.rmtree(destination)
        os.rename(destination + "_model", destination)

        os.remove(path)
        return True

    except Exception as e:
        return e

def verifyModel(path:str="VOSK"):
    if os.path.exists(path):
        return True
    else:
        return False

def recognizeText(modelDir="VOSK", micIndex=None, timeout_chunks=15):
    while not q.empty():
        q.get()
    if not modelDir:
        return ""

    model = vosk.Model(modelDir)
    rec = vosk.KaldiRecognizer(model, 16000)

    silenceCount = 0
    lastText = ""

    print("🎙️ Listening...")

    with sd.RawInputStream(
        samplerate=16000,
        blocksize=4000,
        dtype="int16",
        channels=1,
        callback=callback,
        device=micIndex
    ):
        while True:
            data = q.get()

            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text = result.get("text", "").strip()
                if text:
                    lastText = text
                    return lastText  # full utterance finished

            else:
                partial = json.loads(rec.PartialResult()).get("partial", "").strip()
                if partial:
                    lastText = partial
                    silenceCount = 0
                else:
                    silenceCount += 1
                    if silenceCount >= timeout_chunks:
                        return lastText

def startSFX(path:str="SFX/STTstart.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def stopSFX(path:str="SFX/STTstop.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def errorSFX(path:str="SFX/STTerror.wav"):
    SFX = pygame.mixer.Sound(path)
    SFX.play()

def listMics():
    print(sd.query_devices())