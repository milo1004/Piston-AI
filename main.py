import utils, TTSutils, os, platform, shutil, subprocess, json
from pathlib import Path
from datetime import datetime
import string
import psutil
import TFutils
import time

WAKE_WORDS = [
    "hey raspberry pi",
    "hey piston",
    "hi",
    "hey man",
    "raspberry pi"
]

def removePunc(text:str) -> str:
    translator = str.maketrans('', '', string.punctuation)
    return text.translate(translator)

def validateAlarms(path:str="data/alarm/alarms.json"):
    weekday = datetime.now().strftime("%a").lower()
    parentDir = os.path.dirname(path)
    DEFAULT_CONTENT = {
        "alarms":[]
    }
    if not Path(parentDir).exists():
        os.mkdir(parentDir)
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    if not Path(path).exists():
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    with open(path,"r") as f:
        alarms = json.load(f)
        alarms = alarms.get("alarms",[])
    for alarm in alarms:
        if "enabled" in alarm and "repeat" in alarm:
            if weekday in alarm["repeat"]:
                alarm["enabled"] = True
            else:
                alarm["enabled"] = False
        else:
            alarm["enabled"] = False
            alarm["repeat"] = []

def clearCache(cachePath:str="data/tmp") -> None:
    if not Path(cachePath).exists:
        os.mkdir(cachePath)
        return None
    shutil.rmtree(cachePath)
    os.mkdir(cachePath)
    return None

if __name__ == "__main__":
    print("\n\033[1mWelcome to Piston AI!\033[0m")
    if not psutil.sensors_battery().power_plugged:
        print("\nI would recommend you to plug in you laptop since FasterWhisper is demanding.")
    print("Clear Cache...")
    clearCache()
    print("Getting location...")
    with open("data/tmp/locationCache.txt","w") as f:
        lat,lon,data = utils.getLocation()
        city = data.get("city","")
        f.write(f"{lat}\n{lon}\n{city}")
        f.close()
    print("Validating Alarms...")
    validateAlarms()
    if platform.system() == "Windows":
        os.system("cls")
    elif platform.system() in ("Linux","Darwin"):
        os.system("clear")
    print("Loading FasterWhisper...")
    import FasterWhisper
    invalidCount = 0
    proc = subprocess.Popen(["python","bin/alarmGoOff.py"])
    FasterWhisper.startupSFX()
    invalidCount = 0
    while True:
        if invalidCount > 5:
            validateAlarms()
        if invalidCount > 15:
            proc.kill()
            proc = subprocess.Popen(["python", "bin/alarmGoOff.py"])
        TFutils.ListenForWW(modelPath="data/openwakeword/wakeword.tflite",threshold=0.7)
        validCount = 0
        reply = ""
        while validCount < 3:
            validCount += 1
            print("Recognizing...")
            FasterWhisper.startSFX()
            try:
                text = FasterWhisper.listen_and_transcribe(1,SILENCE_THRESHOLD=375,SILENCE_DURATION=3.3)
                print(text)
            except KeyboardInterrupt:
                print("Keyboard interrupt.")
                break
            except Exception as e:
                FasterWhisper.errorSFX()
                reply = f"Error: {e}"
                break
            if text:
                validCount -= 1
                reply = utils.main(text)
                print(reply)
                if reply:
                    TTSutils.speak(reply)
                else:
                    pass
            else:
                validCount = 1
                reply = ""
        time.sleep(0.5)
        continue # Clearner, just in case
