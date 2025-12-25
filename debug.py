import utils
import TTSutils

while True:
    uInput = input("\nYou> ")
    if uInput == "":
        continue
    elif uInput in ("quit","exit"):
        break
    reply = utils.main(uInput)
    print(reply,end="\n")