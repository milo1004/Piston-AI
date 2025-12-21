from datetime import datetime
import libForBin

date = datetime.today()
response, error = libForBin.askPiston(f"Say the date \"{date}\" in a natural way.")

if error:
    print(f"error: {error}")
else:
    print(response.get("reply"))