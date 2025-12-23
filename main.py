import utils, TTSutils, os, platform, shutil, subprocess, json
from pathlib import Path
from datetime import datetime
import string
import psutil

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

def clearCache(cachePath:str="data/tmp"):
    shutil.rmtree(cachePath)
    os.mkdir(cachePath)

if __name__ == "__main__":
    if not psutil.sensors_battery().power_plugged:
        print("\n\033[1mI would recommend you to plug in you laptop since FasterWhisper is demanding.\033[0m\n")
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
    print("Loading FasterWhisper...")
    import FasterWhisper
    invalidCount = 0
    subprocess.Popen(["python","bin/alarmGoOff.py"])
    FasterWhisper.startupSFX()
    while True:
        invalidCount += 1
        if invalidCount > 15:
            invalidCount = 0
            subprocess.Popen(["python","bin/alarmGoOff.py"])
        if invalidCount > 5:
            validateAlarms()
            invalidCount = 0
        try:
            print("Detecting wake word...")
            reply = FasterWhisper.listen_and_transcribe(device_index=1,wakewords=WAKE_WORDS,SILENCE_DURATION=1.5,SILENCE_THRESHOLD=350)
            print(reply)
            reply = removePunc(reply)
            if any(WW in reply.lower() for WW in WAKE_WORDS):
                print("Wake word detected!")
                validCount = 0
                recognitionPath = "data/tmp/recognition.txt"
                with open("data/tmp/recognition.txt","w") as f:
                    f.write("True")
                    f.close()
                while validCount < 5:
                    print("Recognizing...")
                    if not Path(recognitionPath).exists():
                        with open(recognitionPath,"w") as f:
                            f.write("True")
                            continue
                    else:
                        with open(recognitionPath) as f:
                            if f.read() != "True":
                                break
                    try:
                        validCount += 1
                        FasterWhisper.startSFX()
                        reply = FasterWhisper.listen_and_transcribe(device_index=1,SILENCE_DURATION=2.7,SILENCE_THRESHOLD=350)
                        print(reply)
                        FasterWhisper.stopSFX()
                        if not reply:
                            continue
                        else:
                            response = utils.main(reply)
                            TTS = response
                            print(f"Reply: {TTS}")
                        TTSutils.speak(TTS)
                    except KeyboardInterrupt:
                        FasterWhisper.stopSFX()
                        break
                    except Exception as e:
                        FasterWhisper.errorSFX()
                        print(e)
                        break
            elif reply == "abort":
                print("Bye!")
                break
        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            FasterWhisper.stopSFX()
            break
        except Exception as e:
            FasterWhisper.errorSFX()
            print(e)
            break