import subprocess, platform

platformName = platform.system()
if platformName in ("Darwin","Windows"):
    subprocess.run(["pip", "install", "-r", "requirements.txt"])
    print("Setup complete. You can now run main.py.")
else:
    subprocess.run(["python","-m","venv","venv"])
    subprocess.run(["source","venv/bin/activate","&&","pip","install","-r","requirements.txt"],shell=True)
    print("Setup complete. You can now activate the virtual environment and run main.py.")