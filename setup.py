import subprocess, sys, platform
from pathlib import Path
import urllib.request

args = sys.argv

def in_venv():
    return sys.prefix != getattr(sys, "real_prefix", sys.prefix)

print("Welcome to Piston AI setup!")
major = sys.version_info.major
minor = sys.version_info.minor
if platform.system() == "Windows":
    setupWW = [sys.executable,"bin/wakeword.train.py"]
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
    subprocess.run([sys.executable,"bin/wakeword.train.py"])
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
                    subprocess.run(["source", "venv/bin/activate", "&&", linuxInstallCommand], shell=True, check=True)
                except subprocess.CalledProcessError as e:
                    print(f"Error: {e}")
                    sys.exit()
            else:
                print("Installing dependencies...")
                try:
                    subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
                    subprocess.run(["source", "venv/bin/activate", "&&", linuxInstallCommand], shell=True, check=True)
                except subprocess.CalledProcessError as e:
                    print(f"Error: {e}")
        subprocess.run(["source","venv/bin/activate",sys.executable,"bin/wakeword.train.py"])
    else:
        print(f"Python version {major}. Please upgrade to Python 3.11 or later.")
        sys.exit()