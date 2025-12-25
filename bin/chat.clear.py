import json
from libForBin import askPiston

def clearChat(filePath:str="history.json"):
    DEFAULT_CONTENT = {
        "history": []
    }
    with open(filePath, "w") as f:
        json.dump(DEFAULT_CONTENT, f, indent=4)

if __name__ == "__main__":
    reply, e = askPiston("Tell the user that you have cleared the chat history in a natural way.")
    if e:
        print(f"Error: {e}")
    else:
        print(reply.get("reply",""))
    clearChat()