# 🤖 Piston AI

Piston AI is a modular, terminal-based AI assistant focused on **voice interaction**, **automation**, and **extensibility**.  
It combines **speech-to-text**, **text-to-speech**, and **LLM inference** (via Workers AI) to create a lightweight, hackable personal AI system.

Think of it as a DIY voice assistant — but open, scriptable, and fun to mess with.

---

## ✨ Features

- 🎙️ **Speech-to-Text (STT)**
- 🔊 **Text-to-Speech (TTS)**
- 🧠 **LLM backend via Workers AI**
- 🧩 Modular Python structure (easy to extend)
- 🖥️ Runs fully in the terminal
- 🐧 Cross-platform (Linux / macOS / Windows)

---

## 🧠 How It Works (High-level)

1. Microphone input is captured
2. Audio is converted to text (STT)
3. Text is sent to an AI backend (Workers AI)
4. AI response is received
5. Response is spoken back using TTS
6. Conversation history is optionally stored

---

## 🛠️ How to setup

### 🪟 Windows:
1. Install Python 3 from (here)[python.org]
2. Clone the source code:
   ```
   git clone --depth=1 https://github.com/milo1004/Piston-AI.git
   cd Piston-AI
3. Setup Piston AI:
   ```
   python setup.py
4. Run Piston AI:
   ```
   python main.py

### 🐧Linux:
1. Install Python (e.g. Ubuntu):
   ```
   sudo apt install python3 python3-pip
2. In this step, it requires you to create an rc file depending on your shell:
   - Get your shell:
     ```
     echo $SHELL
   - If your shell is bash or zsh, do the following:
     ```
     sudo touch ~/.rc  # ~/.zshrc if you're using zsh.
     sudo echo 'alias python="python3"' >> ~/.bashrc  # ~/.zshrc if you're using zsh.
   - If you use another shell like ash:
     ```
     sudo touch ~/.profile
     sudo echo 'alias python="python3"'
3. Download source code:
   ```
   git clone --depth=1 https://github.com/milo1004/Piston-AI.git
   cd Piston-AI
4. Setup Piston AI:
   ```
   python setup.py

5. Run Piston-AI:
   ```
   source venv/bin/activate
   python main.py

Enjoy!!🔥
