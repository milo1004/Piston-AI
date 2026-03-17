import webview
import os
import sys

class API:
    def getJSON(self):
        if not os.path.exists("src/localStorage.json"):
            with open("src/localStorage.json", "w") as f:
                f.write("{}")
            return "{}"
        else:
            with open("src/localStorage.json", "r") as f:
                try:
                    file = f.read()
                except Exception as e:
                    print(f"Error: {e}")
                    return
                return file
    def applyJSON(self, jsonFile):
        with open("src/localStorage.json","w") as f:
            try:    
                f.write(jsonFile)
                return "Success"
            except Exception as e:
                return e
    def deleteAllData(self):
        try:
            os.remove("src/localStorage.json")
            return
        except:
            return
api = API()
webview.create_window("Piston AI", "index.html", fullscreen=True, js_api=api)
webview.start()