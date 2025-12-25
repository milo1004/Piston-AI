import os
import warnings

# Hide the pygame welcome message
os.environ['PYGAME_HIDE_SUPPORT_PROMPT'] = '1'

# Silence the specific pkg_resources deprecation warning
warnings.filterwarnings("ignore", category=UserWarning, module='pygame.pkgdata')
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
import json

# Optional: enable command-line editing
try:
    import readline
except ImportError:  # Windows fallback
    os.system("pip install pyreadline3")
    import pyreadline3  # type: ignore

WORKER_URL = "https://piston-ai.chanyanyan3205.workers.dev"
HISTORY_FILE = "history.json"
MEMORY_FILE = "data/memory/memories.json"

def askPiston(message: str, workerURL: str = WORKER_URL) -> tuple:
    try:
        with open(MEMORY_FILE, "r") as f:
            memory = json.load(f)["memories"]
            memories = [m["text"] for m in memory]
            f.close()
    except Exception as e:
        print(e)
        memories = []
    try:
        with open(HISTORY_FILE, "r") as f:
            historyRaw = json.load(f)
        if historyRaw == {}:
            history = []
        else:
            history = historyRaw["history"]
    except Exception as e:
        history = []
    system_memory = ""
    if memories:
        system_memory = (
                "You have access to the following long-term memories. "
                "They are factual and must be used when relevant:\n"
                + "\n".join(f"- {m}" for m in memories)
                + "\n"
        )

    payload = {
        "history": history,
        "prompt": system_memory + message
    }

    try:
        r = requests.post(workerURL, json=payload, timeout=10)

        if r.status_code != 200:
            return None, f"{r.status_code}: {r.reason}"
        with open("data/tmp/response.txt", "w") as f:
            json.dump(r.json(), f, indent=4)
        return r.json(), None

    except Exception as e:
        return None, e


def saveHistory(historyFile: str = HISTORY_FILE, role: str = None, message: str = None):
    DEFAULT_CONTENT = {
        "history":[]
    }
    parentDir = os.path.dirname(historyFile)
    if not Path(parentDir).exists():
        os.makedirs(parentDir)
        with open(historyFile, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
    elif not Path(historyFile).exists():
        with open(historyFile, "w") as f:
            json.dump(DEFAULT_CONTENT, f, indent=4)
    payload = {
        "role": role,
        "content": message
    }

    with open(historyFile, "r") as f:
        history = json.load(f)
        f.close()
    history["history"].append(payload)
    with open(historyFile, "w") as f:
        json.dump(history, f, indent=4)

def executeMessage(message:str):
    executable = f"bin/{message.split()[0]}.py"
    arg = message.split()[1:]
    args = []
    if Path(executable).exists():
        for item in arg:
            args.append(item)
        args = " ".join(args)
        if args:
            proc = subprocess.run(["python", executable, args], capture_output=True, text=True)
        else:
            proc = subprocess.run(["python", executable], capture_output=True, text=True)
        stdout = proc.stdout
        stderr = proc.stderr
        if stderr:
            return f"Error: {stderr}"
        else:
            return stdout
    else:
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