import json
import libForBin
import pygame
import time
from pydub import AudioSegment
from datetime import datetime

pygame.init()
pygame.mixer.init()

def getAudioDuration(path:str="SFX/defaultAlarm.mp3"):
    audio_file = AudioSegment.from_file(path)
    return audio_file.duration_seconds # duration in seconds (float)


def loadAlarms(path:str="data/alarm/alarms.json") -> dict:
    try:
        with open(path) as file:
            return json.load(file).get("alarms", [])
    except Exception:
        return []

def alarmGoOff(label="Alarm",AlarmTone:str="SFX/defaultAlarm.mp3"):
    AlarmToneLength = getAudioDuration(AlarmTone)
    if label in ("Alarm",""):
        TTS = ""
    else:
        TTS = label

    if TTS:
        libForBin.speak(TTS)
        pygame.mixer.Sound(TTS).play()
        sound = pygame.mixer.Sound(AlarmTone)
        channel = sound.play()
        while channel.get_busy():
            time.sleep(1)
    else:
        sound = pygame.mixer.Sound(AlarmTone)
        channel = sound.play()
        while channel.get_busy():
            time.sleep(1)
        delay = max(0, 60 - AlarmToneLength)
        time.sleep(delay)

if __name__ == "__main__":
    fired = set()
    while True:
        currentTime = datetime.now().strftime("%H%M")
        for alarm in loadAlarms():
            key = (alarm["id"], currentTime)

            label = alarm.get("label")
            alarmTime = alarm.get("time")
            enabled = alarm.get("enabled")
            if enabled and currentTime == str(alarmTime).zfill(4):
                fired.add(key)
                alarmGoOff(label=label)
        time.sleep(1) # CPU brun prevention
