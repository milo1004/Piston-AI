import webview
import os
import sys
from plyer import notification

def relativePath(path):
    if hasattr(sys, "_MEIPASS"):
        base = sys._MEIPASS
    else:
        base = os.path.dirname(os.path.abspath(__file__))

    return os.path.join(base, path)

class API:
    def getJSON(self):
        if not os.path.exists(relativePath("src/localStorage.json")):
            with open(relativePath("src/localStorage.json"), "w") as f:
                f.write("{}")
            return "{}"
        else:
            with open(relativePath("src/localStorage.json"), "r") as f:
                try:
                    file = f.read()
                except Exception as e:
                    print(f"Error: {e}")
                    return
                return file
    def applyJSON(self, jsonFile):
        with open(relativePath("src/localStorage.json"),"w") as f:
            try:    
                f.write(jsonFile)
                return "Success"
            except Exception as e:
                return e
    def deleteAllData(self):
        try:
            os.remove(relativePath("src/localStorage.json"))
            return
        except:
            return
        
    def sendNoti(self, message="Notification"):
        try:
            print("Message sent")
            notification.notify(
                title="Piston AI",
                message=message, 
                app_name="Piston AI",
                app_icon=None,
                timeout=10
            )
        except Exception as e:
            print(e)

if __name__ == "__main__":
    print(relativePath("index.html"))
    api = API()
    webview.create_window("Piston AI", "index.html", fullscreen=True, js_api=api)
    webview.start(debug=True)