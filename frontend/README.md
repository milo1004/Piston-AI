# Source code
This is the source code of the frontend of Piston AI. 
You might wonder WHY it's not in a website form, but it's a tauri app. Therefore, all the web source files are in the src/ folder

# Building the app
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