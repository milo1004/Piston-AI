## macOS
### Building the app:
    python3 -m nuitka \
        --mode=app \
        --macos-app-icon=src/src/favicon.icns \
        --include-data-dir=src/=src/ \
        --include-data-files=index.html=index.html \
        --include-data-files=main.py=main.py \
        --clang \
        --lto=yes \
        --output-folder-name="Piston AI"\
        main.py
    codesign --deep --force --verify --verbose \
    --sign "milo1004" \
    Piston\ AI.app
    create-dmg \
    --volname "Piston AI" \
    --volicon "src/src/favicon.icns" \
    --window-pos 200 120 \
    --window-size 600 400 \
    --icon-size 128 \
    --app-drop-link 400 200 \
    --codesign "milo1004" \
    "Piston_AI-macos-arm64.dmg" \
    "Piston AI.app"
### Cleaning build cache:
    rm -rf 

## Linux
### Building the app:
    python3 -m nuitka \
        --mode=onefile \
        --lto=yes \
        --remove-output \
        --include-data-dir=src/=src/ \
        --include-data-files=index.html=index.html \
        --include-data-files=main.py=main.py \
        main.py
