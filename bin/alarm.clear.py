import json
from libForBin import askPiston
from pathlib import Path
import os

DEFAULT_CONTENT = {
    "alarms":[]
}
def clearAlarms(path:str="data/alarm/alarms.json"):
    parentDir = os.path.dirname(path)
    if not Path(parentDir).exists():
        os.mkdir(parentDir)
        with open(path, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
    elif not Path(path).exists():
        with open(path, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
    else:
        with open(path, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
if __name__ == "__main__":
    clearAlarms(path="data/alarm/alarms.json")
    reply, e = askPiston(f"Say that all alarms have been cleared in a natural way.")
    if e:
        print("Cleared all alarms.")
    else:
        print(reply.get("reply"))