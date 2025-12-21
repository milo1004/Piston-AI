import os
try:
    import requests
except (ImportError, ModuleNotFoundError):
    os.system("pip install requests")
    import requests

try:
    from tinydb import TinyDB, Query
except (ImportError, ModuleNotFoundError):
    os.system("pip install tinydb")
    from tinydb import TinyDB, Query
import subprocess
from pathlib import Path

# Optional: enable command-line editing
try:
    import readline
except ImportError:  # Windows fallback
    os.system("pip install pyreadline3")
    import pyreadline3  # type: ignore

WORKER_URL = "https://piston-ai.chanyanyan3205.workers.dev"
HISTORY_FILE = "history.json"

def askPiston(message: str, workerURL: str = WORKER_URL):
    try:
        db = TinyDB(HISTORY_FILE)
        raw = db.all()
        history = [{"role": m["role"], "content": m["content"]} for m in raw]
    except Exception as e:
        return None, e

    payload = {
        "history": history,
        "prompt": message
    }

    try:
        r = requests.post(workerURL, json=payload, timeout=10)

        if r.status_code != 200:
            return None, f"{r.status_code}: {r.reason}"

        return r.json(), None

    except Exception as e:
        return None, e


def saveHistory(historyFile: str = HISTORY_FILE, role: str = None, message: str = None):
    db = TinyDB(historyFile)
    db.insert({
        "role": role,
        "content": message
    })


def executeMessage(message: str):
    cmdPrefix = message.split(" ")[0]
    args = message.split()[1:]
    executablePath = os.path.join(os.getcwd(), "bin", f"{cmdPrefix}.py")

    if Path(executablePath).exists():
        proc = subprocess.run(
            ["python", executablePath, *args],
            capture_output=True,
            text=True
        )

        if proc.returncode != 0:
            return f"[Command error]\n{proc.stderr.strip()}"

        return proc.stdout.strip()

    return message


def main(uInput:str=""):
    reply,e = askPiston(uInput,workerURL=WORKER_URL)
    saveHistory(HISTORY_FILE,role="user",message=uInput)
    if reply is None:
        return e
    elif reply == "chat.clear":
        reply = subprocess.run(["python","bin/chat.clear.py"],capture_output=True)
        return reply.stdout.strip()
    if e is not None:
        saveHistory(HISTORY_FILE, role="assistant", message=f"Error asking Piston: {e}")
        finalMessage = e
    else:
        reply = reply.get("reply",reply)
        finalMessage = executeMessage(reply)
        saveHistory(HISTORY_FILE, role="assistant", message=finalMessage)
    return finalMessage

def getLocation():
    data = requests.get("https://ipinfo.io/json").json()
    lat, lon = map(float, data["loc"].split(","))
    return lat, lon, data