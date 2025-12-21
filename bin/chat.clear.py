import libForBin

reply, error = libForBin.askPiston("Say \"Chat cleared\" in a natural way")

if error:
    print(f"error: {error}")
else:
    print(reply.get("reply",""))

with open("history.json","w") as f:
    f.write("")
    f.close()
