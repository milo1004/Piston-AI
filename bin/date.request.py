from datetime import datetime
import io, sys
# Save the original stdout
original_stdout = sys.stdout
sys.stdout = io.StringIO()  # Redirect stdout to a dummy buffer

import libForBin

# Restore stdout
sys.stdout = original_stdout
date = datetime.today()
response, error = libForBin.askPiston(f"Say the date \"{date}\" in a natural way.")

if error:
    print(f"error: {error}")
else:
    print(response.get("reply"))