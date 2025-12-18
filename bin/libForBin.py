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

def askPiston(message: str, workerURL: str = WORKER_URL):

    payload = {
        "prompt": message
    }

    try:
        r = requests.post(workerURL, json=payload, timeout=10)

        if r.status_code != 200:
            return None, f"{r.status_code}: {r.reason}"

        return r.json(), None

    except Exception as e:
        return None, e


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

# Btw, I've scrapped the *command* holder method, instead it runs the whole reply if the {cmdPrefix}.py exists in bin/. The AI will only return the command without other prompt or text.