import utils, STTutils, TTSutils

print("Welcome to Piston AI!")

print("Mics:")
STTutils.listMics()

print("Checking models...")
verify = STTutils.verifyModel("VOSK")
if not verify:
    print("Downloading model...")
    STTutils.downloadModel()
    print("Extracting model...")
    STTutils.extractModel(destination="VOSK")
else:
    pass

while True:
    print("Detecting wake word...")
    text = STTutils.recognizeText("VOSK",micIndex=None,timeout_chunks=15)
    wakeWords = ("hey piston","hey assistant","hey raspberry pi","hi","hey man")
    if any(w in text for w in wakeWords):
        print("Wake word detected!")
        STTutils.startSFX()
        try:
            text = STTutils.recognizeText()
            print(text)
            reply = utils.main(uInput=text)
            print(f"reply: {reply}")
            TTSutils.speak(text=reply)
        except KeyboardInterrupt:
            STTutils.stopSFX()
            print("Keyboard interrupt")
            break
        except Exception as e:
            STTutils.errorSFX()
            print(e)
            continue
        STTutils.stopSFX()
    else:
        continue