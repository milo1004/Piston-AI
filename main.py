import utils, STTutils, TTSutils, os, platform, shutil, subprocess, json
from pathlib import Path
from datetime import datetime

def checkAlarms(path:str="data/alarm/alarms.json"):
    weekday = datetime.now().strftime("%a").lower()
    with open(path) as f:
        alarmRaw = json.load(f)
    alarms = alarmRaw["alarms"]
    for alarm in alarms:
        if weekday in alarm["repeat"]:
            alarm["enabled"] = True
        else:
            alarm["enabled"] = False
    alarmReturn = {
        "alarms": alarms
    }
    with open(path, "w") as f:
        json.dump(alarmReturn, f, indent=4)

print("Welcome to Piston AI!")

print("Mics:")
STTutils.listMics()

cachePath = "data/tmp"
if Path(cachePath).exists():
    print("Clearing cache...")
    shutil.rmtree(cachePath)
    os.mkdir(cachePath)
else:
    os.mkdir(cachePath)

lat,lon,*_ = utils.getLocation()
with open("data/tmp/locationCache.txt","w") as f:
    f.write(f"{str(lat)}\n{str(lon)}")
    f.close()

print("Checking models...")
verify = STTutils.verifyModel("VOSK")
if not verify:
    print("Downloading model...")
    STTutils.downloadSTTModel()
    print("Extracting model...")
    STTutils.extractModel(destination="VOSK")
else:
    pass
verify = STTutils.verifyModel("WakeVOSK")
if not verify:
    print("Downloading model...")
    STTutils.downloadWakeModel()
    print("Extracting model...")
    STTutils.extractModel(path="WakeVOSK.zip",destination="WakeVOSK")
else:
    pass

recognitionCount = 0
try:
    lat,lon,raw = utils.getLocation()
    with open("data/tmp/locationCache.txt","w") as f:
        f.write(f"{str(lat)}\n{str(lon)}\n{raw['city']}")
        f.close()
except Exception as e:
    print(f"Failed to get location: {e}, continuing.")

invalidCount = 0
recognitionCount = 0
alarmPath = "data/alarm/alarms.json"
alarmDaemon = subprocess.Popen(["python","bin/alarmGoOff.py"])
while True:
    checkAlarms(path=alarmPath)
    invalidCount += 1

    if invalidCount >= 25:
        alarmDaemon.kill()
        alarmDaemon = subprocess.Popen(["python", "bin/alarmGoOff.py"])
        invalidCount = 0

    if invalidCount >= 5:
        invalidCount = 0
        os.system("cls" if platform.system() == "Windows" else "clear")

    print("Detecting wake word...")
    text = STTutils.recognizeText("VOSK", micIndex=None, timeout_chunks=15)
    print(text)

    wakeWords = ("hey piston", "hey assistant", "hey raspberry pi", "hi", "hey man","raspberry pi")

    if not any(w in text for w in wakeWords):
        continue

    print("Wake word detected!")
    STTutils.startSFX()

    recognitionCount += 1
    if recognitionCount >= 25:
        recognitionCount = 0
        try:
            lat, lon, raw = utils.getLocation()
            with open("data/tmp/locationCache.txt", "w") as f:
                f.write(f"{lat}\n{lon}\n{raw['city']}")
        except Exception as e:
            print(f"Failed to refresh location: {e}")

    emptyCount = 0

    while emptyCount < 4:
        try:
            text = STTutils.recognizeText("VOSK")
            print(f"Recognized: {text}")

            if not text.strip():
                emptyCount += 1
                continue

            emptyCount = 0  # reset on valid speech
            reply = utils.main(uInput=text)
            print(f"reply: {reply}")
            TTSutils.speak(text=reply)

        except KeyboardInterrupt:
            STTutils.errorSFX()
            print("Keyboard interrupt")
            break

        except Exception as e:
            STTutils.errorSFX()
            print(e)

    STTutils.stopSFX()