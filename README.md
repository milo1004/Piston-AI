![Banner of Piston AI](AI.png)

# Piston AI
Piston AI is a web-based AI assistant, inspired by the HomePod and the Alexa. The main difference is that it actually incldues a UI, which users can choose from typing in conversations or voice control it.

# Features
- AI assistant
- A standby display for convenience
- Themes
- meaningful quotes

# Contributions:
This project is fully open source under the MIT LICENSE, meaning that persmission is granted to copying and modifying freely.

# Setting up
Since Piston AI is web-based, it is super easy to setup. Just head to [https://pistonai.pages.dev](https://pistonai.pages.dev), and setup according to the on-screen instructions!

# License
[MIT](https://github.com/milo1004/Piston-AI/blob/main/LICENSE)

# About the source code
There are several folders in the source code. Each of them represents different interfaces. 
- The frontend/ folder is used for the website you can visit in [https://pistonai.pages.dev](https://pistonai.pages.dev)
- The backend/ folder is used for the STT engine which processes the audio blob sent from the frontend
- The piston-ai/ folder is used for both the AI model and for the frontend to fetch for daily quotes without being banned by the browser (CORS)