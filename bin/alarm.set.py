import json
import sys
from datetime import datetime
from pathlib import Path
from libForBin import askPiston

DEFAULT_CONTENT = {"alarms": []}


def ensure_dest(path: str):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)

    if not path.is_file():
        path.write_text(json.dumps(DEFAULT_CONTENT, indent=4))


def load_alarms(path: str) -> dict:
    try:
        with open(path, "r") as f:
            data = json.load(f)
            if isinstance(data, dict) and isinstance(data.get("alarms"), list):
                return data
    except json.JSONDecodeError:
        pass

    # Reset corrupted file
    with open(path, "w") as f:
        json.dump(DEFAULT_CONTENT, f, indent=4)
    return DEFAULT_CONTENT


def add_alarm(
    time: int,
    label: str = "",
    json_path: str = "data/alarm/alarms.json"
) -> str:

    ensure_dest(json_path)
    alarms = load_alarms(json_path)

    alarm_id = datetime.now().strftime("%Y%m%d%H%M%S")

    alarm = {
        "id": alarm_id,
        "time": time,
        "label": label,
        "enabled": True
    }

    alarms["alarms"].append(alarm)

    with open(json_path, "w") as f:
        json.dump(alarms, f, indent=4)

    return alarm_id


# -------- CLI ENTRY --------

if __name__ == "__main__":
    # Expected args:
    # python alarms.set.py <time> [label]

    if len(sys.argv) < 2:
        print("No time specified")
        sys.exit(0)

    try:
        time = int(sys.argv[1])
    except ValueError:
        print("Invalid time format")
        sys.exit(0)

    label = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else ""

    alarm_id = add_alarm(time=time, label=label)

    reply, e = askPiston(
        "Confirm in a natural and friendly way that an alarm was added. "
        f"Time: {time}, Label: '{label}'"
    )

    if e:
        print("Alarm added.")
    else:
        print(reply.get("reply"))
