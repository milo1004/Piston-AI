import sys
import os
from datetime import datetime
import json
import re

try:
    from tinydb import TinyDB, Query
except:
    os.system("pip install tinydb")
    from tinydb import TinyDB

alarmsPath = "data/alarm/alarms.json"

try:
    database = TinyDB(alarmsPath)
    Alarm = Query()

    with open(alarmsPath, "r") as json_file:
        alarms = json.load(json_file)
except:
    print("Error loading alarms")

def insertAlarm(alarmName:str,time:str):
    if alarmName == "Alarm":
        alarmName = decodeName()
        alarmName += 1
    database.insert({
        "Name":alarmName,
        "Time":time,
    })

def decodeName():
    alarm_list = alarms.search(Alarm.Name.test(lambda v: v.startswith("Alarm")))
    count = len(alarm_list)
    alarm_list = alarms.search(
        Alarm.Name.test(lambda v: re.match(r"^Alarm\s+\d+$", v))
    )

    numbers = [
        int(re.search(r"\d+", alarm["Name"]).group())
        for alarm in alarm_list
    ]

    return numbers

if __name__ == "__main__":
    insertAlarm(alarmName=sys.argv[1], time=sys.argv[2])