## macOS
python3 -m nuitka \
    --mode=app \
    --macos-app-icon=src/src/favicon.icns \
    --include-data-dir=src/=src/ \
    --include-data-files=index.html=index.html \
    --include-data-files=main.py=main.py \
    --clang \
    --lto=yes \
    main.py

## Linux
python3 -m nuitka \
    --mode=onefile \
    --lto=yes \
    --remove-output \
    --include-data-dir=src/=src/ \
    --include-data-files=index.html=index.html \
    --include-data-files=main.py=main.py \
    main.py
