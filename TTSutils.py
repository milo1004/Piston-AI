import asyncio
import os
import time
try:
    import pygame
    pygame.init()
    pygame.mixer.init()
except (ModuleNotFoundError, ImportError):
    os.system("pip install pygame")
    import pygame
    pygame.init()
    pygame.mixer.init()
try:
    import edge_tts
except (ModuleNotFoundError, ImportError):
    os.system("pip install edge-tts")
    import edge_tts

async def speakAsync(text:str="", output:str="data/tmp/out.mp3",voice:str="en-GB-RyanNeural"):
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output)

def speak(text:str="",file:str="data/tmp/out.mp3"):
    asyncio.run(speakAsync(text))
    sound = pygame.mixer.Sound(file)
    channel =  sound.play()
    while channel.get_busy():
        pygame.time.wait(1)
    os.remove(file) # cleanup
