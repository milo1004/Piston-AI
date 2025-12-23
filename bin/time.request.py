from datetime import datetime
import sys,io
# Save the original stdout
original_stdout = sys.stdout
sys.stdout = io.StringIO()  # Redirect stdout to a dummy buffer

import libForBin

# Restore stdout
sys.stdout = original_stdout

now = datetime.now()

time = datetime.strftime(now, "%H:%M")
time_obj = datetime.strptime(time, "%H:%M")
time_12 = time_obj.strftime("%I:%M %p")

response, error = libForBin.askPiston(f"Say the time \"{time_12}\" in a natural way, and in 12-hour format")

if error:
    print(f"error: {error}")
else:
    print(response.get("reply"))