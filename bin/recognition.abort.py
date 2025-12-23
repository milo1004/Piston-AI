from pathlib import Path
import sys, io
original_stdout = sys.stdout
sys.stdout = io.StringIO()
from libForBin import askPiston
sys.stdout = original_stdout

recognitionCachePath = "data/tmp/recognition.txt"

if not Path(recognitionCachePath).exists():
    with open(recognitionCachePath,"w") as f:
        f.write("False")
else:
    with open(recognitionCachePath,"w") as f:
        f.write("False")

reply, e = askPiston("Say goodbye or see you next time to the user in a natural way.")
if e:
    print(f"Error: {e}")
else:
    print(e)
