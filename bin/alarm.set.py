import sys
import json
import os
from datetime import datetime
from pathlib import Path
from libForBin import askPiston

PATH = "data/alarm/alarms.json"

DEFAULT_CONTENT = {
    "alarms": []
}

# -------------------------
# File safety
# -------------------------
def ensureFileSafety(filename: str = PATH) -> None:
    parentDir = os.path.dirname(filename)

    if parentDir and not Path(parentDir).exists():
        os.makedirs(parentDir, exist_ok=True)

    if not Path(filename).exists():
        with open(filename, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
        return

    try:
        with open(filename, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        data = DEFAULT_CONTENT

    if not isinstance(data, dict) or "alarms" not in data or not isinstance(data["alarms"], list):
        data = DEFAULT_CONTENT

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)


# -------------------------
# Argument parsing
# -------------------------
def parseArgs(argv=sys.argv) -> tuple:
    if len(argv) < 2:
        return None, [], "Alarm"

    try:
        raw = sys.argv[1]
        raw = raw.encode("utf-8").decode("unicode_escape")
        raw = raw[1:len(raw) - 1]
        args = json.loads(raw)
    except json.JSONDecodeError:
        return None, [], "Alarm"

    argTime = args.get("time")
    argRepeat = args.get("repeat", [])
    argLabel = args.get("label", "Alarm")

    if not isinstance(argRepeat, list):
        argRepeat = []

    argTime = str(argTime) if argTime is not None else None

    # normalize time (e.g. "800" -> "0800")
    if argTime and argTime.isdigit():
        argTime = argTime.zfill(4)

    return argTime, argRepeat, argLabel


# -------------------------
# Save alarm
# -------------------------
def saveAlarm(argTime, argRepeat, argLabel, filename: str = PATH) -> str:
    if not argTime:
        return "Time not specified"

    alarmID = datetime.now().strftime("%Y%m%d%H%M%S")
    weekday = datetime.now().strftime("%a").lower()

    enabled = True if not argRepeat or weekday in argRepeat else False

    payload = {
        "id": alarmID,
        "time": argTime,
        "repeat": argRepeat,
        "label": argLabel or "Alarm",
        "enabled": enabled
    }

    with open(filename, "r") as f:
        data = json.load(f)

    data["alarms"].append(payload)

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

    return "Success"


# -------------------------
# Main
# -------------------------
if __name__ == "__main__":
    ensureFileSafety()

    argTime, argRepeat, argLabel = parseArgs(sys.argv)
    result = saveAlarm(argTime, argRepeat, argLabel)

    if result != "Success":
        print(f"Error: {result}")
    else:
        reply, e = askPiston(
            f"Tell the user that you have created an alarm for {argTime} in a natural way."
        )
        if e:
            print(f"Error: {e}")
        else:
            print(reply.get("reply"))
