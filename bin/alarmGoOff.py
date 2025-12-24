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


def loadAlarms(path:str="data/alarm/alarms.json") -> list:
    try:
        with open(path) as file:
            return json.load(file).get("alarms", [])
    except Exception:
        with open(path) as file:
            alarms = json.load(file).get("alarms", [])
            if alarms == []:
                return []
            else:
                return []

def alarmGoOff(label="Alarm",AlarmTone:str="SFX/defaultAlarm.mp3"):
    AlarmToneLength = getAudioDuration(AlarmTone)
    if label in ("Alarm",""):
        TTS = ""
    else:
        TTS = label
    timesToRepeat = 2
    if TTS:
        libForBin.speak(text=TTS)
        for _ in range(timesToRepeat):
            sound = pygame.mixer.Sound(AlarmTone)
            channel = sound.play()
            while channel.get_busy():
                time.sleep(1)
    else:
        for _ in range(timesToRepeat):
            sound = pygame.mixer.Sound(AlarmTone)
            channel = sound.play()
            while channel.get_busy():
                time.sleep(0.3)

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
                alarmGoOff(label=label)
            nowSec = int(datetime.now().strftime("%S"))
            delay = 60 - nowSec
            time.sleep(delay)
