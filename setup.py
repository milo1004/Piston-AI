import subprocess, platform, sys
from pathlib import Path

system = platform.system()

def in_venv():
    return sys.prefix != sys.base_prefix

if system == "Windows" or "Darwin":
    try:
        subprocess.run(["pip", "install", "-r", "requirements.txt"], check=True)
    except subprocess.CalledProcessError:
        try:
            subprocess.run(["pip3", "install", "-r", "requirements.txt"], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Failed to install dependencies: {e}")
    print("\n\033[1mUse 'python main.py' or 'python3 main.py' to start application.\033[0m")
elif system == "Linux":
    if not in_venv():
        print("Creating virtual environment")
        if not Path("venv"):
            try:
                subprocess.run(["python3", "-m", "venv", "venv"], check=True)
            except subprocess.CalledProcessError as e:
                print(f"Failed to create virtual environment: {e}")
        command = "source venv/bin/activate && pip install -r requirements.txt".split()
        commandFallBack = "source venv/bin/activate && pip3 install -r requirements.txt".split()
        try:
            subprocess.run(command, check=True, shell=True)
        except subprocess.CalledProcessError as e:
            try:
                subprocess.run(commandFallBack, check=True, shell=True)
            except subprocess.CalledProcessError as e:
                print(f"Failed to install dependencies: {e}")
    print("\n\033[1mUse 'python main.py' to start application.\033[0m")