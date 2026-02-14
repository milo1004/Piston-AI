const SRBtnEl = document.getElementById("startSTT");
let chunks = [];
let stream = null;
let medRecorder = null;
let recordState = false;
let AIboxout = true;
const AIboxElTemp = document.getElementById("AIbox");
AIboxElTemp.onclick = modAIBox;
let pistonSettingsState = false;

function configPistonSettings() {
    const bg = window.getComputedStyle(document.body).backgroundImage.slice(4, -1).replace(/["']/g, "");

    const pistonSettingsEl = document.getElementById("pistonSettings");
    const settingsContainerEl = document.getElementById("settingsContainer");
    pistonSettingsEl.onclick = () => {
        if (pistonSettingsState === false) {
            showPistonSettings();
        } else if (pistonSettingsState === true) {
            hidePistonSettings();
        }
    }

    settingsContainerEl.onclick = (e) => {
        e.stopPropagation();
  } 
  

    document.addEventListener("click", (e) => {
        if (!settingsContainerEl.contains(e.target) && !pistonSettingsEl.contains(e.target)) {
            hidePistonSettings();
        }
    })
}

function showPistonSettings() {
    pistonSettingsState = true;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    pistonSettingsEl.style.rotate = "180deg";
    settingsContainerEl.style.visibility = "visible";
    settingsContainerEl.style.opacity = "0%";
    requestAnimationFrame(() => {
        settingsContainerEl.style.opacity = "1";
    });
}

function hidePistonSettings() {
    pistonSettingsState = false;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    pistonSettingsEl.style.rotate = "0deg";
    settingsContainerEl.style.opacity ="100%";
    settingsContainerEl.style.opacity = "0%";
    setTimeout(() => {
        settingsContainerEl.style.visibility = "hidden";
    }, 200);
}
async function positionSettings() {
    pistonSettingsState = false;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    const wallpapersContainerEl = document.getElementById("wallpapersContainer");
    wallpapersContainerEl.style.width = (parseFloat(window.getComputedStyle(wallpapersContainerEl).fontSize) / 2) * 2 + 128 * 2 + 'px';

    settingsContainerEl.style.top = pistonSettingsEl.offsetTop + pistonSettingsEl.offsetHeight + 5 + 'px';
    settingsContainerEl.style.right = 2 + "em";
    settingsContainerEl.style.visibility = "hidden";

    let currentWallpaper = localStorage.getItem("currentBG");
    if (!currentWallpaper) {
        localStorage.setItem("currentBG", "gradient-1.jpg");
        currentWallpaper = "gradient-1.jpg";
    }

    const res = await fetch("./src/wallpapers/wallpapers.json");
    const data = await res.json();

    console.log(data);

    wallpapersContainerEl.innerHTML = "";
    
    for (const filename of data) {
        const wallpaper = document.createElement("img");
        wallpaper.src = `./src/wallpapers/${filename}`;
        wallpaper.loading = "lazy";
        wallpaper.style.objectFit = "cover";
        wallpaper.style.width = "128px";
        wallpaper.style.height = "72px";
        wallpaper.style.borderRadius = 5 + 'px';
        wallpaper.id = filename;
        wallpaper.style.border = "none";
        wallpaper.style.opacity = "100%"
        wallpaper.style.transition = "opacity 0.2s ease";
        wallpaper.style.outlineOffset = "30px";
        wallpaper.addEventListener("mouseover", () => {
            wallpaper.style.opacity = "50%"
        });
        wallpaper.addEventListener("mouseout", () => {
            wallpaper.style.opacity = "100%";
        });
        wallpaper.style.cursor = "pointer";
        wallpapersContainerEl.appendChild(wallpaper);
        wallpaper.onclick = () => {
            setCurrentWallpaper(wallpaper.id);
            positionSettings();
            showPistonSettings();
        }
    }

    const children = wallpapersContainerEl.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.border = "none";
    }
    const currentWallpaperElement = document.getElementById(currentWallpaper);
    currentWallpaperElement.style.border = "2px solid";
    currentWallpaperElement.style.borderColor = "#a6ff01";

    document.body.style.backgroundImage = `url('./src/wallpapers/${currentWallpaper}')`;

    configPistonSettings();
}

function setCurrentWallpaper(wallpaper) {
    document.body.style.opacity = "0%";
    requestAnimationFrame(() => {
        document.body.style.backgroundImage = `url('./src/wallpapers/${wallpaper}')`;
    })
    requestAnimationFrame(() => {
        document.body.style.opacity = "100%";
    })   
    localStorage.setItem("currentBG", wallpaper);
}

function handleInput() {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT");

    if (manInEl.value.trim() === "") {
        sendBtnEl.disabled = true;
        sendBtnEl.style.opacity = "20%";
        startSTTEl.disabled = false;
        startSTTEl.style.opacity = "100%";
    } else if (manInEl.value.trim() !== "") {
        sendBtnEl.disabled = false;
        sendBtnEl.style.opacity = "100%";
        startSTTEl.disabled = true;
        startSTTEl.style.opacity = "20%";
    }
}

function handleEnter(e) {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT")
    if (e.key == "Enter") {
        e.preventDefault();
        if (manInEl.value.trim() !== "") {
            askPiston(manInEl.value);
            manInEl.value = "";
            sendBtnEl.disabled = true;
            sendBtnEl.style.opacity = "20%";
            startSTTEl.disabled = false;
            startSTTEl.style.opacity = "100%";
            return;
        }
    }
}

function positionManIn() {

    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT");

        manInEl.style.left = startSTTEl.offsetLeft - 5 - manInEl.offsetWidth + 'px';
        manInEl.style.bottom = 10 + 'px';
    sendBtnEl.style.left = startSTTEl.offsetLeft - 5 - sendBtnEl.offsetWidth - 8 + 'px';
    const rel_borders = (manInEl.offsetHeight - sendBtnEl.offsetHeight) / 2;
    sendBtnEl.style.top = manInEl.offsetTop + rel_borders + 'px';
    manInEl.style.paddingRight = 8 + sendBtnEl.offsetWidth + 5 + 'px';
    manInEl.style.width = parseFloat(getComputedStyle(manInEl).fontSize) * 25 - parseFloat(manInEl.style.paddingRght) + 'px';
    if (manInEl.value === "") {
        sendBtnEl.disabled = true;
        startSTTEl.disabled = false;
    } else if (manInEl.value.trim() !== "") {
        sendBtnEl.disabled = false;
        startSTTEl.disabled = true;
    }

    manInEl.removeEventListener("input", handleInput);
    manInEl.addEventListener("input", handleInput);
    
    manInEl.removeEventListener("keydown", handleEnter);
    manInEl.addEventListener("keydown", handleEnter);
}

function modAIBox() {
    const weatherEl = document.getElementById("weather");
    const AIboxEl = document.getElementById("AIbox");

    if (AIboxout === true) {
        const target_y = window.innerHeight - AIboxEl.offsetHeight * 0.16;
        const rel_y = target_y - AIboxEl.offsetTop;
        AIboxEl.style.transform = `translate(0, -100px)`;
        setTimeout(() => {}, 200);
        AIboxEl.style.transform = `translate(0, ${rel_y}px)`;
        AIboxout = false;
    } else if (AIboxout === false) {
        const target_y = weatherEl.offsetTop + weatherEl.offsetHeight + 10;
        const rel_y = target_y - AIboxEl.offsetTop;
        AIboxEl.style.transform = `translate(0, 100px)`;
        setTimeout(() => {}, 200);
        AIboxEl.style.transform = `translate(0, ${rel_y}px)`;
        AIboxout = true;
    }
}
async function requestMic() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted!");
    } catch (e) {
        if (e.name === "NotAllowedError" || e === "PermissionDeniedError") {
            alert("Microphone permission has been denied.");
        } else if (e.name === "NotFoundError") {
            alert("Warning: Microphone not found. Make sure a microphone has been connected properly.");
            var micNotFound = true;
        } else {
            alert("getUserMedia failed: ",e.name,e.message);
            console.error(e);
        }
        const SRHintEl = document.getElementById("SRHint");
        SRHintEl.style.visibility = "hidden";   
    }
}

async function checkMicPerm() {
    const permissionStat = await navigator.permissions.query({ name: "microphone" });
    console.log(`Microphone permission state = ${permissionStat.state}`);
    if (permissionStat.state === "granted") {
        return 0;
    } else if (permissionStat.state === "denied") {
        return 1;
    } else if (permissionStat.state === "prompt") {
        return 2;
    }
}

function modManIn(hide) {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    if (hide) {
        manInEl.style.opacity = 0;
        sendBtnEl.style.opacity = 0;
        manInEl.disabled = true;
        setTimeout(() => {
            manInEl.style.visibility = "hidden";
            sendBtnEl.style.visibility = "hidden";
        }, 200);
    } else if (!hide) {
        manInEl.style.visibility = "visible";
        sendBtnEl.style.visibility = "visible";
        manInEl.style.opacity = 100;
        sendBtnEl.style.opacity = 100;
        manInEl.disabled = false;
        if (manInEl.value === "") {
            sendBtnEl.disabled = true;
            sendBtnEl.style.opacity = "20%";
        } else {
            sendBtnEl.disabled = false; 
            sendBtnEl.style.opacity = "100%";
        }
    }
}

function showAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");;

    abortSTTEl.style.visibility = "visible";
    const target_x = -5 - abortSTTEl.offsetWidth + 'px';

    abortSTTEl.style.transform = `translate(${target_x}, 0)`;
    setTimeout(() => {}, 200);
    abortSTTEl.style.opacity = "100%";
    abortSTTEl.disabled = false;

    abortSTTEl.onclick = stopSTT;
}

function hideAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");;

    abortSTTEl.style.opacity = "100%";

    const target_x = startSTTEl.offsetLeft - abortSTTEl.offsetLeft + 'px';

    abortSTTEl.style.transform = `translate(${target_x}, 0)`;
    abortSTTEl.style.visibility = "hidden";
    abortSTTEl.style.disabled = true;
}

async function startRecording() {
    if (medRecorder?.state === "recording") {
        console.log("Already recording");
        recordState = true;
        return;
    } 
    recordState = true;
    modRecordBtn();
    SRBtnEl.removeEventListener("mouseout", removeHint);
    const SRHintEl = document.getElementById("SRHint");
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    SRHintEl.style.visibility = "visible";
    showAbort();
    SRHintTxtEl.textContent = "Listening...";
    try {
        medRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm;codecs=opus",
            audioBitsPerSecond: 128000
        });
        chunks = [];
        
        medRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        medRecorder.start();
        console.log("Listening");
        modManIn(true);

    } catch (e) {
        console.error("Error listenting: ",e);
        recordState = false;
        modRecordBtn();
        SRBtnEl.addEventListener("mouseout",removeHint);
        SRHintTxtEl.textContent = "Press to start speech recognition";
    }
}

function modRecordBtn() {
    const startSTTEl = document.getElementById("startSTTImg");
    if (recordState === true) {
        startSTTEl.src = "src/STT'ing.png";
    } else if (recordState === false) {
        startSTTEl.src = "src/STT.png"
    }
}

function positionAIBox() {
    const AIboxEl = document.getElementById("AIbox");
    const tcEl = document.getElementById("tc");

    AIboxEl.style.top = (tcEl.offsetTop + tcEl.offsetHeight) + 10 + 'px';
    AIboxEl.style.left = (window.innerWidth - AIboxEl.offsetLeft) / 2; 

    const historyMsg = JSON.parse(localStorage.getItem("history"));

    if (historyMsg === null) return;
    
    if (historyMsg.length === 0) return;
    AIboxEl.innerHTML = "";
    for (let i = 0; i < historyMsg.length; i++) {
        if (historyMsg[i].role == "user") {
            const userIn = document.createElement("p");
            userIn.style.color = "white";
            userIn.style.userSelect = "text";
            userIn.style.cursor = "text";
            userIn.textContent = `You: ${historyMsg[i].content}`;
            AIboxEl.appendChild(userIn);
        } else if (historyMsg[i].role === "assistant") {
            const pisRes = document.createElement("p");
            pisRes.style.color = "#a6ff01";
            pisRes.style.marginTop = "5px";
            pisRes.style.userSelect = "text";
            pisRes.style.cursor = "text";
            pisRes.textContent = historyMsg[i].content;
            AIboxEl.appendChild(pisRes);
            const lineBreak = document.createElement("br");
            lineBreak.style.lineHeight = 2.0;
            AIboxEl.appendChild(lineBreak);
        }

    }
    AIboxEl.style.visibility = "visible";
    AIboxout = false;
    modAIBox();
}

async function stopRecording() {
    if (!medRecorder || medRecorder.state !== "recording") {
        recordState = false;
        console.warn("No active recording to stop.");
        modRecordBtn();
        return;
    }

    recordState = false;
    modRecordBtn();
    medRecorder.stop();
    modManIn(false);
    positionAIBox();
    const SRHintEl = document.getElementById("SRHint");
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    AIboxout = false;
    SRHintEl.style.visibility = "visible";
    hideAbort();
    SRHintTxtEl.textContent = "Transcribing...";
    await new Promise(resolve => {
        medRecorder.onstop = resolve;
    })
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm")
    const res = await fetch("https://backend.chanyanyan3205.workers.dev/", {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    SRHintTxtEl.textContent = "Asking Piston AI...";
    const reponse = await askPiston(data.text);
    SRHintTxtEl.textContent = "Press to start recognition";
    SRHintEl.style.visibility = "hidden";
    SRBtnEl.addEventListener("mouseout", removeHint);
}

function saveHistory(roles, message) {
    let previousMessage = JSON.parse(localStorage.getItem("history"));
    if (!previousMessage) {
        previousMessage = [];
    }
    const payload = {
        role: roles,
        content: message
    }
    previousMessage.push(payload);
    localStorage.setItem("history", JSON.stringify(previousMessage));

    if (previousMessage.length > 50 * 2) {
        previousMessage.shift();
        previousMessage.shift();
        localStorage.setItem("history", JSON.stringify(previousMessage));
        return;
    }
}

function removeHint() {
    document.getElementById("SRHint").classList.remove("show");
    clearTimeout(hintTimer);
}

window.addEventListener("resize", () => {
    positionHint();
    alignClock();
    positionClock();
    positionWeather();
    positionManIn();
    positionAbort();
    positionAIBox();
    positionSettings();
    positionTodoBox();
})

const setupInputEl = document.getElementById("setup-input");
setupInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        setupDone();
    }
});

SRBtnEl.addEventListener("mouseover", () => {
    hintTimer = setTimeout(() => {
        const SRHintEl = document.getElementById("SRHint");
        SRHintEl.classList.add("show");
    }, 500);
});

SRBtnEl.addEventListener("mouseout", removeHint);

SRBtnEl.onclick = async () => {
    let micPerm;
    micPerm = await checkMicPerm();
    if (micPerm === 0) {
    } else if (micPerm === 1) {
        alert("Microphone access has been denied. Please grant it in browser setings or system settings.");
        return;
    } else if (micPerm === 2) {
        requestMic();
        micPerm = checkMicPerm();
        if (micPerm === 1) {
            alert("Warning: Microphon access has been denied. Grant it in browser to use Piston AI.");
        } else if (micPerm === 0) {
            console.log("Microphone access granted!");
            return;
        }
    }

    if (recordState === false) {
        startRecording();
    } else {
        stopRecording();
    }
    
}

const sendBtnEl = document.getElementById("sendBtn");
sendBtnEl.onclick = () => {
    const manInEl = document.getElementById("manIn");
    const startSTTEl = document.getElementById("startSTT");
    response = askPiston(manInEl.value);
    manInEl.value = "";
    sendBtnEl.disabled = true;
    startSTTEl.disabled = false;
}

function addMemory(message) {
    console.log(message.length);
    if (message.length === 0) {
        return;
    } else {
        let memory = JSON.parse(localStorage.getItem("memory"));
        const memoryAddNotiEl = document.getElementById("memoryAddNoti");
        const memorydescriptionEl = document.getElementById("memorydescription");
        if (!memory) {
            localStorage.setItem("memory","[]");
            memory = [];
        }
        memory.push(message);
        localStorage.setItem("memory",JSON.stringify(memory));
        noVerboseAsk(`Tell ${localStorage.getItem("username")} that you have remembered about "${message}".`);
        memoryAddNotiEl.style.transform = `translate(0, ${memoryAddNotiEl.offsetHeight + 5 + 'px'})`;
        memoryAddNotiEl.style.visibility = "visible";
        memoryAddNotiEl.style.top = memoryAddNotiEl.offsetHeight + 5 + 'px';
        memorydescriptionEl.textContent = `The memory: "${message}" has been added`;
        setTimeout(() => {
            memoryAddNotiEl.style.transform = `translate(0, ${-memoryAddNotiEl.offsetHeight + 5 + 'px'})`;
            setTimeout(() => {
                memoryAddNotiEl.style.visibility = "hidden"
            }, 500);
        }, 3000);
    }
}

async function noVerboseAsk(uInput) {
    const AIboxEl = document.getElementById("AIbox");
    try {
        AIboxEl.style.visibility = "visible";
        if (!AIboxout) { modAIBox(); };
        const now = new Date(); 
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                prompt: uInput
            })
        });
        if (!result.ok) {
            throw `POST https://chanyanyan3205.cloudflare.com/ ${result.statusText}`;
        }
        const response = await result.json();
        saveHistory(roles="assistant", message=response.reply);
        const pisRes = document.createElement("p");
        pisRes.style.color = "#a6ff01";
        pisRes.style.userSelect = "text";
        pisRes.style.cursor = "text";
        pisRes.style.marginTop = "5px";
        pisRes.textContent = response.reply;
        AIboxEl.appendChild(pisRes);
        const lineBreak = document.createElement("br");
        lineBreak.style.lineHeight = 2.0;
        AIboxEl.appendChild(lineBreak);
    } catch (e) {
        const pisRes = document.createElement("p");
        pisRes.style.color = "#a6ff01";
        pisRes.style.userSelect = "text";
        pisRes.style.cursor = "text";
        pisRes.style.marginTop = "5px";
        pisRes.textContent = `Error: ${e.state}, ${e}`;
        AIboxEl.appendChild(pisRes);
    }
}

async function askPiston(uInput) {
    const AIboxEl = document.getElementById("AIbox");
    try {
        AIboxEl.style.visibility = "visible";

        let historyMsg = localStorage.getItem("history");
        if (!historyMsg) {
            historyMsg = [];
        } else {
            historyMsg = JSON.parse(historyMsg);
        }
        
        const clearPromptEl = document.getElementById("clearPrompt");
        if (clearPromptEl) {
            clearPromptEl.remove();
            const brEl = AIbox.querySelectorAll("br");
            brEl.forEach(br => {
                br.parentNode.removeChild(br);
            })
        }
        const uInputEl = document.createElement("p");
        uInputEl.style.color = "white";
        uInputEl.style.userSelect = "text";
        uInputEl.style.cursor = "text";
        uInputEl.textContent = `You: ${uInput}`;
        AIboxEl.appendChild(uInputEl); 
        if (!AIboxout) { modAIBox(); };
        saveHistory(roles="user", message=uInput);
        let memory = `You have access to the memory below: \n The user's name is ${localStorage.getItem("username")}, ${JSON.stringify(localStorage.getItem("memory"))}`;
        const now = new Date(); 
        let AdditionalData = `Additional data: \nweather data:${localStorage.getItem("weatherData")}\ndate (DD/MM/YYYY): ${now.getDate().toString().padStart(2,"0")}/${now.getMonth().toString().padStart(2,"0")}/${now.getFullYear}\ntime (hour:minute): ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                history: historyMsg,
                prompt: `${memory}\n\n${AdditionalData}\n\nUser input: ${uInput}`
            })
        });
        if (!result.ok) {
            throw `POST https://chanyanyan3205.cloudflare.com/ ${result.statusText}`;
        }
        const response = await result.json();
        console.log(`Raw reply: ${response.reply}`);
        
        if (response.reply.slice(0,10).toLowerCase() === "memory.add") {
            addMemory(response.reply.slice(11, response.reply.length));
            return;
        } 
        if (response.reply.slice(0,12).toLowerCase() === "memory.clear") {
            const pisRes = document.createElement("p");
            localStorage.setItem("memory","[]");
            pisRes.style.color = "#a6ff01";
            pisRes.style.userSelect = "text";
            pisRes.style.cursor = "text";
            pisRes.style.marginTop = "5px";
            pisRes.textContent = "Memory cleared!";
            AIboxEl.appendChild(pisRes);
            
            const linebreak = document.createElement("br");
            linebreak.style.lineHeight = 2.0;
            AIboxEl.appendChild(linebreak);

            saveHistory(roles="assistant", message="Memory cleared!");
            return;
        }

        saveHistory(roles="assistant", message=response.reply);
            
        if (response.reply.includes("chat.clear")) {
            localStorage.setItem("history", "[]");
            response.reply = "Chat cleared! Let's start fresh";
            document.getElementById("AIbox").innerHTML = "";
            const linebreak = document.createElement("br");
            linebreak.style.lineHeight = 2.0;
            AIboxEl.appendChild(linebreak);
        }

        if (response.reply === "Chat cleared! Let's start fresh") {
            const pisRes = document.createElement("p");
            pisRes.style.color = "#a6ff01";
            pisRes.style.userSelect = "text";
            pisRes.style.cursor = "text";
            pisRes.style.marginTop = "5px";
            pisRes.textContent = response.reply;
            pisRes.setAttribute("id","clearPrompt");
            AIboxEl.appendChild(pisRes);
            return;
        } else {
            const pisRes = document.createElement("p");
            pisRes.style.color = "#a6ff01";
            pisRes.style.userSelect = "text";
            pisRes.style.cursor = "text";
            pisRes.style.marginTop = "5px";
            pisRes.textContent = response.reply;
            AIboxEl.appendChild(pisRes);
        }
        const lineBreak = document.createElement("br");
        lineBreak.style.lineHeight = 2.0;
        AIboxEl.appendChild(lineBreak);
    } catch (e) {
        const pisRes = document.createElement("p");
        pisRes.style.color = "#a6ff01";
        pisRes.style.userSelect = "text";
        pisRes.style.cursor = "text";
        pisRes.style.marginTop = "5px";
        pisRes.textContent = `Error: ${e.state}, ${e}`;
        AIboxEl.appendChild(pisRes);
    }
}

function positionHint() {
    const Hint = document.getElementById("SRHint");
    const SRBtn = document.getElementById("startSTT");

    const rect = SRBtn.getBoundingClientRect();
    const target_y = rect.top - rect.height / 2 - 10 + 'px';
    console.log(target_y);

    Hint.style.top = target_y;
}

function stopSTT() {
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    const SRHintEl = document.getElementById("SRHint");
    if (recordState) {
        console.log("Recording aborted!");
        medRecorder.stop();
        recordState = false;
        modRecordBtn();
        hideAbort();
        SRHintTxtEl.textContent = "Press to start recognition";
        SRHintEl.style.visibility = "hidden";
        SRBtnEl.addEventListener("mouseout", removeHint);
        modManIn(true);
    } else {
        console.warn("No recording is currently in progress.");
    }
}

function positionAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");
    
    abortSTTEl.style.left = startSTTEl.offsetLeft;
    abortSTTEl.style.top = startSTTEl.offsetTop;

    abortSTTEl.disabled = true;
    abortSTTEl.style.visibility = "hidden";
    
    abortSTTEl.onclick = stopSTT;
    
}

function updateClock() {
    const now = new Date();
    let hour = now.getHours().toString().padStart(2,"0");
    let minute = now.getMinutes().toString().padStart(2,"0");

    const hourEl = document.getElementById("hour");
    const minuteEl = document.getElementById("minute");

    hourEl.textContent = hour;
    minuteEl.textContent = minute;

    const weekdayEl = document.getElementById("weekday");
    const dateEl = document.getElementById("date");
    
    const weekdays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]

    let weekday = now.getDay();
    let dateRN = now.getDate().toString();

    weekdayEl.textContent = weekdays[weekday];
    dateEl.textContent = dateRN;
}
function alignClock() {
    updateClock();
    const now = new Date();
    const remainingSecs = 60 - now.getSeconds();
    setTimeout(() => {
        updateClock();
        setInterval(() => {
            updateClock();
            positionClock();
        },60000);
    }, remainingSecs * 1000);
}

function positionClock() {
    const clockEl = document.getElementById("tc");
    const greeting = document.getElementById("greeting");

    const hourEl = document.getElementById("hour");
    const minuteEl = document.getElementById("minute");
    const colonEl = document.getElementById("colon"); 

    clockEl.style.width = (hourEl.offsetWidth + minuteEl.offsetWidth + colonEl.offsetWidth + parseInt(window.getComputedStyle(clockEl).getPropertyValue("padding-left"))) + 15 + 'px';

    const rect = greeting.getBoundingClientRect();
    clockEl.style.top = rect.bottom + (10 / window.innerHeight) + 'px';
    clockEl.style.right = rect.left - 3 + 'px';
}

function positionWeather() {
    const greeting = document.getElementById("greeting");
    const weatherEl = document.getElementById("weather");
    const weatherInfoEl = document.getElementById("weatherInfo");
    const timeContainerEl = document.getElementById("tc");

    const rect = greeting.getBoundingClientRect();
    weatherEl.style.top = rect.bottom + (10 / window.innerHeight) + 'px';

    weatherEl.style.right = "10%";
}

async function getLocation() {
    try {

        const response = await fetch(`https://ipapi.co/json`, {
            signal: AbortSignal.timeout(5000)
        });
        const data = await response.json();

        console.log(`Lat: ${data.latitude} Lon: ${data.longitude}`);
        getWeather(data.latitude, data.longitude);
    } catch (error) {
        console.error("Failed to obtain ip or lat and lon: ", error);
        getWeather();
    }


}

async function getWeather(lat, lon) {
    const codes = { 0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "foggy", 48: "foggy", 51: "light drizzle", 61: "rain", 80: "rain showers", 95: "thunderstorm" };
    if (!lat && !lon) {
        const data = JSON.parse(localStorage.getItem("weatherData"));
        if (!data) {
            console.log("Weather cache not found");
            return 
        };
        const temp = data.current_weather.temperature.toString();
        const code = codes[data.current_weather.weathercode];
        const tempUnit = data.current_weather_units.temperature;
        console.log(data)

        const tempEl = document.getElementById("temp");
        const weatherText = document.getElementById("weatherText");
        const weatherData = document.getElementById("weatherData");

        tempEl.textContent = temp + tempUnit;
        weatherText.textContent = code;
        weatherData.src = `src/${code}.png`

        console.log(temp,tempUnit," ",code,);
        return;
    }
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {
            signal: AbortSignal.timeout(5000)
        });
        const data = await response.json();

        const temp = data.current_weather.temperature.toString();
        const code = codes[data.current_weather.weathercode];
        const tempUnit = data.current_weather_units.temperature;
        console.log(data)

        const tempEl = document.getElementById("temp");
        const weatherText = document.getElementById("weatherText");
        const weatherData = document.getElementById("weatherData");

        tempEl.textContent = temp + tempUnit;
        weatherText.textContent = code;
        weatherData.src = `src/${code}.png`

        console.log(temp,tempUnit," ",code,);
        localStorage.setItem("weatherData",JSON.stringify(data));
    } catch (e) {
        console.log(`Failed to get weather: ${e}`);
        console.log("Fallback. Using cached data.");

        const data = JSON.parse(localStorage.getItem("weatherData"));

        if (!data) {
            console.log("Fallback failed. No weather data cached.")
        } else {
            getWeather();
        }
    }
}

async function getQuoteOfTheday() {
    const quoteOfTheDayEl = document.getElementById("quoteOfTheDay");
    const qotdEl = document.getElementById("qotd");
    const quoteAuthorEl = document.getElementById("quoteAuthor");
    fontsize = parseFloat(window.getComputedStyle(quoteOfTheDayEl).fontSize);
    qotdEl.style.width = document.getElementById("tc").offsetWidth - fontsize * 1.25 + 'px';
    try {
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev/quote", {
            signal: AbortSignal.timeout(5000)
        });
        const data = await result.json();
        localStorage.setItem("quote", JSON.stringify(data));

        console.log(data);

        quoteOfTheDayEl.textContent = `"${data.text}"`;
        quoteAuthorEl.textContent = `- ${data.author}`;
        positionTodoBox();
    } catch (e) {
        console.log(`Failed to obtain quote: ${e}`);
        console.log("Fallback: Using quote from cache");
        
        const data = JSON.parse(localStorage.getItem("quote"));
        if (!data) {
            console.log("Previously cached quote not found.");
        }
        
        quoteOfTheDayEl.textContent = `"${data.text}"`;
        quoteAuthorEl.textContent = `- ${data.author}`;

        alert("This device is currently in offline mode.");
        positionTodoBox();
    }
    positionAIBox();
}

function positionTodoBox() {
    const tcEl = document.getElementById("tc");
    const todoBoxEl = document.getElementById("todoBox");

    const rect = tcEl.getBoundingClientRect();
    todoBoxEl.style.top = rect.top + rect.height + 25 + 'px';
    todoBoxEl.style.left = window.innerWidth * 0.1 + 'px';
    todoBoxEl.style.visibility = "visible";
    todoBoxEl.style.width = rect.width + rect.width * 0.1 * 2 + 'px';
    todoBoxEl.style.left = rect.left - (todoBoxEl.offsetWidth - rect.width) / 2 + 'px';
}

function initApp() {
    let userName = localStorage.getItem("username");
    requestMic();
    if (!userName) {
        showSetup();
        return;
    } else {
        const greetingEl = document.getElementById("greeting");
        greetingEl.textContent = `Welcome back, ${userName}!`;
        positionHint();
        alignClock();
        positionClock();
        positionWeather();
        getLocation();
        positionManIn();
        positionAbort();
        positionAIBox();
        getQuoteOfTheday();
        positionSettings();
        updateGreeting();
        setInterval(() => {
            getLocation();
            updateGreeting();
        }, 3600000);
    }
}

function showSetup() {
    const setupEl = document.getElementById("setUp-container");
    setupEl.style.visibility = "visible";
    document.body.classList.add("blur-active");
    const setupInputEl = document.getElementById("setup-input");
    setupInputEl.focus();
}

function setupDone() {
    const inputEl = document.getElementById("setup-input");
    const warningTxt = document.getElementById("setup-warning");
    const username = inputEl.value.trim();

    if (!username) {
        inputEl.focus();
        warningTxt.textContent = "Please enter a name";
        warningTxt.style.visibility = "visible";
        return;
    } else {
        const setupEl = document.getElementById("setUp-container");
        const greetingEl = document.getElementById("greeting");
        localStorage.setItem("username",username);
        greetingEl.textContent = `Welcome back, ${username}!`;
        setupEl.style.opacity = "0%";
        requestAnimationFrame(() => {
            setupEl.style.visibility = "hidden";
            warningTxt.style.visibility = "hidden"
        })

        document.body.classList.remove("blur-active");
        positionHint();
        alignClock();
        positionClock();
        positionWeather();
        getLocation();
        positionManIn();
        positionAbort();
        positionAIBox();
        getQuoteOfTheday();
        positionSettings();
        positionTodoBox();
        return;
    }
}

function redirectToGitHub() {
    window.open("https://github.com/milo1004","_blank");
}

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    console.log(hour)
    const morning = ["Good morning","Morning","Hey"]
    const afternoon = ["Good afternoon","Hey there"];
    const evening = ["Good evening","Evening","Hope your day went good"];
    const night = ["Still up?", "Burning up the midnight oil?"];
    const greetingEl = document.getElementById("greeting");

    let greet;

    if (hour >= 5 && hour < 12) {
        greet = `${morning[Math.floor(Math.random() * morning.length)]}, ${localStorage.getItem("username")}`
    } else if (hour >= 12 && hour < 17) {
        greet = `${afternoon[Math.floor(Math.random() * afternoon.length)]}, ${localStorage.getItem("username")}`;
    } else if (hour >= 17 && hour < 23) {
        greet = `${evening[Math.floor(Math.random() * evening.length)]}, ${localStorage.getItem("username")}`;
    } else {
        greet = `${night[Math.floor(Math.random() * night.length)]} ${localStorage.getItem("username")}?`;
    }

    greetingEl.textContent = greet;
    if (greetingEl.textContent.includes("undefined")) {
        updateGreeting();
    }
}

document.fonts.ready.then(() => {
    document.body.style.visibility = "visible";
    initApp();
});