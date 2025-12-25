import subprocess, sys, platform, os, json
from pathlib import Path
from datetime import datetime
import time as t

args = sys.argv

DEFAULT_CONTENT = {
    "memories":[]
}
def saveMemory(name:str,path:str="data/memory/memories.json"):
    createdAt = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    IdISOformat = str(datetime.now().isoformat())
    parentDir = os.path.dirname(path)
    if not Path(parentDir).exists():
        os.makedirs(parentDir)
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    elif not Path(path).exists():
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    else:
        with open(path,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    with open(path,"r") as f:
        payload = {
            "id": IdISOformat,
            "text": f"The user's name is {name}",
            "created_at": createdAt
        }
        data = json.load(f)
        data["memories"].append(payload)
        f.close()
    with open(path,"w") as f:
        json.dump(data,f,indent=4)

def in_venv():
    return sys.prefix != getattr(sys, "real_prefix", sys.prefix)

if __name__ == "__main__":
    print("Welcome to Piston AI!")
    name = input("First of all, what is your name? ")
    if not name:
        name = ""
    saveMemory(name)
    print(f"Hi, {name}!")
    t.sleep(1)
    print("Now, we will install the dependencies needed. Hang on a while!")
    major = sys.version_info.major
    minor = sys.version_info.minor
    if platform.system() == "Windows":
        setupWW = [sys.executable, "bin/wakeword.train.py"]
        installationCmd = [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"]
        if major < 3:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            sys.exit()
        elif major == 3 and minor < 11:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            sys.exit()
        elif major == 3 and minor >= 11:
            try:
                subprocess.run(installationCmd, check=True)
            except subprocess.CalledProcessError as e:
                print(f"Error: {e}")
                sys.exit()
        else:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
        subprocess.run([sys.executable, "bin/wakeword.train.py"])
    elif platform.system() == "Linux":
        if major < 3:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            sys.exit()
        elif major == 3 and minor < 11:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            sys.exit()
        elif major == 3 and minor >= 11:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            linuxInstallCommand = [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"]
            if in_venv():
                print("Installing dependencies...")
                try:
                    subprocess.run(["source", "venv/bin/activate", "&&", linuxInstallCommand], shell=True, check=True)
                except subprocess.CalledProcessError as e:
                    print(f"Error: {e}")
                    sys.exit()
            else:
                if Path("venv").exists():
                    print("Installing dependencies...")
                    try:
                        subprocess.run(["source", "venv/bin/activate", "&&", linuxInstallCommand], shell=True,
                                       check=True)
                    except subprocess.CalledProcessError as e:
                        print(f"Error: {e}")
                        sys.exit()
                else:
                    print("Installing dependencies...")
                    try:
                        subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
                        subprocess.run(["source", "venv/bin/activate", "&&", linuxInstallCommand], shell=True,
                                       check=True)
                    except subprocess.CalledProcessError as e:
                        print(f"Error: {e}")
            subprocess.run(["source", "venv/bin/activate", sys.executable, "bin/wakeword.train.py"])
        else:
            print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
            sys.exit()