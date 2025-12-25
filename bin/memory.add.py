import json
import os
from datetime import datetime
from pathlib import Path
from libForBin import askPiston
import sys

DEFAULT_CONTENT = {
    "memories":[]
}
def addMemory(text:str=None,memoryPath:str="data/memory/memories.json") -> None:
    parentDir = os.path.dirname(memoryPath)
    if not Path(parentDir).exists():
        os.makedirs(parentDir)
        with open(memoryPath,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    elif not Path(memoryPath).exists():
        with open(memoryPath,"w") as f:
            json.dump(DEFAULT_CONTENT,f,indent=4)
    else:
        with open(memoryPath,"r") as f:
            if not f.read().startswith("{") and not f.read().endswith("}"):
                with open(memoryPath,"w") as f:
                    json.dump(DEFAULT_CONTENT,f,indent=4)
    memoryId = str(datetime.now().isoformat())
    createdAt = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    if text is None:
        return
    else:
        with open(memoryPath,"r") as f:
            if f.read != "" and f.read().startswith("{") and f.read().endswith("}"):
                data = json.loads(f.read())
            else:
                with open(memoryPath,"w") as file:
                    file.write("")
                    json.dump(DEFAULT_CONTENT,file,indent=4)
                    file.close()
            file.close()
        payload = {
            "id":memoryId,
            "text":text,
            "createdAt":createdAt,
        }
        data["memories"].append(payload)
        with open(memoryPath,"w") as f:
            json.dump(data,f,indent=4)

if __name__ == "__main__":
    args = sys.argv[1:]
    addMemory(text=args)
    reply, err = askPiston(f"Tell the user that you have added {args} to your memory in a natural way.")
    if err:
        print(f"Error: {err}")
    else:
        print(reply)