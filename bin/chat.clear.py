import sys, io
# Save the original stdout
original_stdout = sys.stdout
sys.stdout = io.StringIO()  # Redirect stdout to a dummy buffer

from libForBin import askPiston

# Restore stdout
sys.stdout = original_stdout
reply, error = askPiston("Say \"Chat cleared\" in a natural way")

if error:
    print(f"error: {error}")
else:
    print(reply.get("reply",""))

with open("history.json","w") as f:
    f.write("")
    f.close()

