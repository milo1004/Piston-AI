from datetime import datetime
import libForBin

now = datetime.now()

time = datetime.strftime(now, "%H:%M")
time_obj = datetime.strptime(time, "%H:%M")
time_12 = time_obj.strftime("%I:%M %p")

response, error = libForBin.askPiston(f"Say the time \"{time_12}\" in a natural way, and in 12-hour format")

if error:
    print(f"error: {error}")
else:
    print(response.get("reply"))