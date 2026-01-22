![Banner of Piston AI](AI.png)

# 🤖 Piston AI

**Piston AI** is an open-source, **browser-based voice AI assistant** powered by **Cloudflare Workers AI**.  
It focuses on **low-latency speech interaction**, **simplicity**, and **no client-side API keys**.

A lightweight, voice assistant — inspired by Alexa / Siri — but built like a standby agent.

### Visit the site: https://pistonai.pages.dev/

---

## ✨ Features

- 🎙️ **Speech-to-Text (STT)** using Workers AI
- 🧠 **LLM inference via Cloudflare Workers AI**
- 🌐 **Fully browser-based frontend**
- ⚡ **Low latency** (~2s typical)
- 🔐 **No API keys exposed to users**
- 🧩 Simple & extendable architecture
- 🖱️ Interactive UI (minimizable AI box!)

---

## 🧠 How It Works

1. Audio is recorded in the browser using `MediaRecorder`
2. Audio is sent as `audio/webm` to a Cloudflare Worker
3. Workers AI performs speech-to-text
4. The transcription is returned to the frontend
5. (Optional) The text is sent to an LLM for response generation
6. The result is displayed in the UI

## 📄 Third-Party Licenses

This project uses the following third-party resources:

- **Material Design Icons**  
  © Google  
  Licensed under the Apache License, Version 2.0  
  https://www.apache.org/licenses/LICENSE-2.0

Material Design is a trademark of Google LLC.

## 💻 Wanna modify this project?
The frontend of this project is FULLY open source, under the MIT LICENSE!
To download it:
```bash
    git clone https://github.com/milo1004/Piston-AI.git
```
*I'd recommend you to open index.html with Live Server of VSCode, since backend would block some weather, location and Workers AI requests.*

**Note**: The backend runs on **Cloudflare Workers AI** and does **not require client-side API keys**.

Enjoy!