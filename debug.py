import utils
import TTSutils

while True:
    uInput = input("\nYou> ")
    if uInput == "":
        continue
    reply = utils.main(uInput)
    print(reply,end="\n")