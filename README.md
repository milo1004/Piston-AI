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

# Frotnend Source code
This is the source code of the frontend of Piston AI. 
You might wonder WHY it's not in a website form, but it's a tauri app. Therefore, all the web source files are in the src/ folder

# Building the app
First, you must head to the directory `frontend`
## Prerequisites
Before building the app, you will first need to install npm, nodeJS and cargo.

How to install dependencies:
```bash
npm install
```

## Steps to building Piston AI
1. Open terminal in this current directory and type in:
```bash
npm run tauri build
```
2. Extract the binary files from *src-tauri/target/release/bundle/*

## Cleaning the directory
Building Tauri can take up 1-4GB of storage. Therefore, this command helps you free them up:
```bash
cd src-tauri
cargo run clean
```

# Credits
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) font is used as the primary typeface. Licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/).
- [Unsplash](https://unsplash.com/) wallpapers are used. Credit these creators:

    - Photo by <a href="https://unsplash.com/@codioful?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Codioful (Formerly Gradienta)</a> on <a href="https://unsplash.com/photos/purple-and-pink-light-illustration-rKv4HduvzIE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    - Photo by <a href="https://unsplash.com/@lukechesser?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luke Chesser</a> on <a href="https://unsplash.com/photos/light-blue-to-dark-blue-gradient-pJadQetzTkI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
     -Photo by <a href="https://unsplash.com/@codioful?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Codioful (Formerly Gradienta)</a> on <a href="https://unsplash.com/photos/purple-and-pink-light-illustration-rKv4HduvzIE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    - Photo by <a href="https://unsplash.com/@lastly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tyler Lastovich</a> on <a href="https://unsplash.com/photos/mountain-covered-with-fog-yz3Lt5Kwdi8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    - Photo by <a href="https://unsplash.com/@alexlanting?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex</a> on <a href="https://unsplash.com/photos/blue-sky-with-white-clouds-r254y37vFEY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      