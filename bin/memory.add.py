import json
import os
from datetime import datetime
from pathlib import Path
from libForBin import askPiston
import sys
import copy

DEFAULT_CONTENT = {
    "memories":[]
}
def addMemory(text:str=None) -> None:
    memoryPath: str = "data/memory/memories.json"
    data = copy.deepcopy(DEFAULT_CONTENT)
    parentDir = os.path.dirname(memoryPath)
    if parentDir and not Path(parentDir).exists():
        os.makedirs(parentDir)
    if not Path(memoryPath).exists():
        with open(memoryPath,"w") as f:
            json.dump(DEFAULT_CONTENT   ,f,indent=4)
    else:
        with open(memoryPath,"r") as f:
            try:
                data = json.load(f)
                if not "memories" in data or not isinstance(data["memories"], list):
                    data = copy.deepcopy(DEFAULT_CONTENT)
            except json.decoder.JSONDecodeError:
                with open(memoryPath,"w") as file:
                    json.dump(DEFAULT_CONTENT ,file,indent=4)

    if not text or not text.strip():
        return
    payload = {
        "id":str(datetime.now().isoformat()),
        "text":text,
        "created_at":str(datetime.now().strftime("%Y%m%d%H%M%S")),
    }
    data["memories"].append(payload)
    with open(memoryPath,"w") as f:
        json.dump(data,f,indent=4)



if __name__ == "__main__":
    args = " ".join(sys.argv[1:])
    addMemory(args)
    reply, err = askPiston(f"Tell the user that you have added {args} to your memory in a natural way.")
    if err:
        print(f"Error: {err}")
    else:
        print(reply.get("reply",""))