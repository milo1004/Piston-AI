import json
from pathlib import Path
from libForBin import askPiston
import os

DEFAULT_CONTENT = {
    "alarms": []
}

def get_alarms(path:str="data/alarm/alarms.json"):
    parentDir = os.path.dirname(path)
    if not Path(parentDir).is_dir():
        os.mkdir(parentDir)
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
        return DEFAULT_CONTENT
    elif not Path(path).is_file():
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
        return DEFAULT_CONTENT
    else:
        with open(path,"r") as f:
            alarms = json.load(f)
        if alarms == {}:
            with open(path,"w") as f:
                json.dump(DEFAULT_CONTENT, f, indent=4)
            return DEFAULT_CONTENT
        else:
            return alarms

def parse_alarms(alarms:dict) -> list:
    alarms = alarms.get("alarms",[])
    if alarms == []:
        return []
    else:
        enabledAlarms = []
        for item in alarms:
            if item.get("enabled",False):
                enabledAlarms.append(item.get("time","The key \"time\" is not found."))
        return enabledAlarms

if __name__ == "__main__":
    alarms = get_alarms()
    enabledAlarms = parse_alarms(alarms)
    reply,e = askPiston(f"Read out the enabled alarms' time from this list in a natural and friendly way:{enabledAlarms}\n if the time is 24-hour format, convert it to 12-hour format with AM/PM")
    if e:
        print(f"Error: {e}")
    else:
        print(reply.get("reply"))