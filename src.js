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
    settingsContainerEl.style.visibility = "visible";
    settingsContainerEl.style.opacity = "0%";
    requestAnimationFrame(() => {
        settingsContainerEl.style.opacity = "1";
    })
}

function hidePistonSettings() {
    pistonSettingsState = false;
    const settingsContainerEl = document.getElementById("settingsContainer");
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
        localStorage.setItem("currentBG", "dark.jpg");
        currentWallpaper = "dark.jpg";
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
        const target_y = window.innerHeight - AIboxEl.offsetHeight * 0.2;
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
    modAIBox();
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
    getLocation();
    positionManIn();
    positionAbort();
    positionAIBox();
    positionSettings();
    if (createAlarmInProgress) {
        createAlarmFunc();
    }
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

        let memory = `You have access to the memory below: \n The user's name is ${localStorage.getItem("username")}`;
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
        saveHistory(role="user", message=uInput);
        const response = await result.json();
        saveHistory(role="assistant", message=response.reply);
            
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
        modManIn(false);
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

let createAlarmInProgress = false;

function positionAlarm() {
    const AIboxEl = document.getElementById("AIbox");
    const alarmBoxEl = document.getElementById("alarmBox");
    const alarmPromptEl = document.getElementById("alarmPrompt");
    const createAlarmEl = document.getElementById("createAlarm");
    const alarmsContainerEl = document.getElementById("alarmsContainer");

    AIboxEl.style.visibility = "visible";
    alarmBoxEl.style.visibility = "visible";
    const target_y = AIboxEl.offsetTop +'px';
    const target_x = (AIboxEl.offsetLeft - alarmBox.offsetWidth) / 2 + 'px';

    alarmPromptEl.style.width = alarmBoxEl.offsetWidth;
    alarmBoxEl.style.top = target_y;
    alarmBoxEl.style.left = target_x;
    createAlarmEl.style.left = alarmPromptEl.offsetLeft + 4 + 'px';
    alarmsContainer.style.height = alarmBoxEl.offsetHeight - alarmPrompt.offsetHeight - 3 + 'px';
    alarmsContainer.style.width = alarmBoxEl.offsetWidth + 'px';
    alarmPrompt.style.top = "0px";
    alarmsContainer.style.top = alarmPrompt.offsetHeight + 'px';
    AIboxEl.style.visibility = "hidden";

    createAlarmEl.onclick = handleAlarmBack;

    positionAIBox();
}

function handleAlarmBack() {
    const alarmsContainerEl = document.getElementById("alarmsContainer");
        if (createAlarmInProgress === true) {
            alarmsContainerEl.innerHTML = "";
            document.getElementById("createImg").src = "src/add.png"
            createAlarmInProgress = false;
            // TODO: Add function to enumerate and render through all alarms
        } else if (createAlarmInProgress === "repeatStage"){
            createAlarmFunc();
        } else {
            createAlarmFunc();
        }
}

function addAlarm(title, hour, minute, repeats) {
    const AIboxEl = document.getElementById("AIbox");
    const alarmBoxEl = document.getElementById("alarmBox");
    
    let previousAlarms = JSON.parse(localStorage.getItem("alarms"));
    if (previousAlarms === null) localStorage.setItem("alarms", []);

    if (repeats.length === 0 || repeats === null) {
        repeats = [];
    }

    const now = new Date();
    
    const alarmId = `${now.getFullYear()}${now.getMonths}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
        
    const payload = {
        name:title,
        time:`${hour}:${minute}`,
        repeat:repeats,
        id: alarmId
    }

    if (previousAlarms.length === 0 || previousAlarms === "") {
        previousAlarms = [];
    }
    
    previousAlarms.push(payload);

    localStorage.setItem("alarms", JSON.stringify(previousAlarms));
}

function createAlarmFunc() {
    const alarmsRepeatedEl = document.getElementById("alarmsRepeated");
    alarmsRepeatedEl.style.visibility = "hidden";
    createAlarmInProgress = true;
    const promptTextEl = document.getElementById("promptText");
    const alarmImg = document.getElementById("createImg");
    const alarmsContainerEl = document.getElementById("alarmsContainer");
    const alarmBoxEl = document.getElementById("alarmBox");
    alarmsContainerEl.style.overflowX = "hidden";   

    promptTextEl.textContent = "Create Alarm";
    alarmImg.src = "src/back.png";
                        
    alarmsContainerEl.style.visibility = "visible";
    alarmsContainerEl.innerHTML = "";
    alarmsContainerEl.style.width = alarmBoxEl.offsetWidth;
    
    const timeContainerEl = document.createElement("div");
    timeContainerEl.style.display = "flex";
    timeContainerEl.style.flexDirection = "row";
    timeContainerEl.style.position = "relative";
    timeContainerEl.style.width = alarmsContainerEl.offsetWidth + 'px';
    timeContainerEl.style.border = "0.7px solid gray";
    timeContainerEl.style.backgroundColor = "black";
    timeContainerEl.style.paddingTop = '3px';
    timeContainerEl.style.paddingBottom = '3px';
    const timePrompt = document.createElement("p"); 
    timePrompt.style.display = "flex";
    timePrompt.style.alignItems = "center";
    timePrompt.style.marginLeft = "1em";
    timePrompt.textContent = "Time";
    timePrompt.style.backgroundColor = "black";
    timePrompt.style.width = "4em";
    timePrompt.style.color = "white";
    timePrompt.style.height = "2.75em";
    const timeSelector = document.createElement("input");
    timeSelector.style.backgroundColor = "white";
    timeSelector.style.color = "black";
    const now = new Date();
    const currentHour = String(now.getHours()).padStart(2,"0");
    const currentMinute = String(now.getMinutes()).padStart(2,"0");
    timeSelector.type = "Time";
    timeSelector.value = `${currentHour}:${currentMinute}`;
    timeSelector.style.width = "15em";
    timeSelector.style.position = "absolute";
    timeSelector.style.right = "1em"; 
    timeSelector.style.height = "2.75em";
    timeSelector.style.borderRadius = "2em";
    timeSelector.style.paddingLeft = "0.5em";
    timeSelector.style.paddingRight = "0.5em";
    timeContainerEl.offsetHeight = timeSelector.offsetHeight + 3 + 'px';
    timeContainerEl.appendChild(timePrompt);
    timeContainerEl.appendChild(timeSelector);

    alarmsContainerEl.appendChild(timeContainerEl);

    const labelContainerEl = document.createElement("div");
    labelContainerEl.style.display = "flex";
    labelContainerEl.style.flexDirection = "row";
    labelContainerEl.style.position = "relative";
    labelContainerEl.style.width = alarmsContainerEl.offsetWidth + 'px';
    labelContainerEl.style.border = "0.7px solid gray";
    labelContainerEl.style.backgroundColor = "black";
    labelContainerEl.style.paddingTop = '3px';
    labelContainerEl.style.paddingBottom = '3px';
    
    const labelPromptEl = document.createElement("p");
    labelPromptEl.style.display = "flex";
    labelPromptEl.style.alignItems = "center";
    labelPromptEl.style.marginLeft = "1em";
    labelPromptEl.textContent = "Time";
    labelPromptEl.style.backgroundColor = "black";
    labelPromptEl.style.width = "4em";
    labelPromptEl.style.color = "white";
    labelPromptEl.style.height = "2.75em";
    labelPromptEl.textContent = "Label";

    const labelInput = document.createElement("input");
    labelInput.style.backgroundColor = "white";
    labelInput.placeholder = "Alarm";
    labelInput.style.color = "black";
    labelInput.style.width = "15em";
    labelInput.style.position = "absolute";
    labelInput.style.right = "1em"; 
    labelInput.style.height = "2.75em";
    labelInput.style.borderRadius = "2em";
    labelInput.style.paddingLeft = "1em";

    labelContainerEl.appendChild(labelPromptEl);
    labelContainerEl.appendChild(labelInput);
    alarmsContainerEl.appendChild(labelContainerEl);

    const repeatContainerEl = document.createElement("div");
    repeatContainerEl.style.display = "flex";
    repeatContainerEl.style.flexDirection = "row";
    repeatContainerEl.style.position = "relative";
    repeatContainerEl.style.width = alarmsContainerEl.offsetWidth + 'px';
    repeatContainerEl.style.border = "0.7px solid gray";
    repeatContainerEl.style.backgroundColor = "black";
    repeatContainerEl.style.padding = "0 0 0 0";
    repeatContainerEl.style.height = labelPromptEl.offsetHeight + 'px';

    const repeatButton = document.createElement("button");
    repeatButton.style.border = "0px";
    repeatButton.style.width = alarmsContainerEl.offsetWidth + 6 + 'px';
    repeatButton.style.backgroundColor = "black";
    repeatButton.style.cursor = "pointer";
    repeatButton.style.transition = "background-color 0.2s ease";
    repeatButton.addEventListener("mouseover", () => {
        repeatButton.style.backgroundColor = "gray";
    });
    repeatButton.addEventListener("mouseout", () => {
        repeatButton.style.backgroundColor = "black";
    })
    repeatButton.style.display = "flex";
    repeatButton.style.flexDirection = "row";
    repeatButton.style.color = "white";
    const repeatPrompt = document.createElement("p");
    repeatPrompt.style.display = "flex";
    repeatPrompt.textContent = "Repeat";
    repeatPrompt.style.alignItems = "center";
    repeatButton.style.alignItems = "center";      


    const repeatImg = document.createElement("img");
    repeatImg.src = "src/enter.png";
    repeatImg.style.height = "2em";
    repeatImg.style.width = "2em";
    repeatImg.style.position = "absolute";
    repeatImg.style.right = "1px";
    repeatButton.appendChild(repeatPrompt);
    repeatButton.appendChild(repeatImg);
    repeatContainerEl.appendChild(repeatButton);

    repeatButton.onclick = () => {
        if (alarmsRepeatedEl.style.visibility === "hiddden") {
            alarmsRepeatedEl.style.position = "absolute";
            alarmsRepeatedEl.style.left = alarmsContainerEl.offsetLeft + alarmsContainerEl.offsetWidth + 'px';
            alarmsRepeatedEl.style.top = alarmBoxEl.offsetTop + repeatButton.offsetHeight * 3 + 'px';
            alarmsRepeatedEl.style.visibility = "visible";
        } else if (alarmsRepeatedEl.style.visibility === "visible") {
            alarmsRepeatedEl.style.visibility = "hidden";
        }
    }   
    

    var repeated = [];
    if (repeated.length === 0) {
        repeatPrompt.textContent = "Repeat: None"
    } else {
        repeatPrompt.textContent = `Repeat: ${repeated.join(", ")}`;
    }

    alarmsContainerEl.appendChild(repeatContainerEl);
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
    updateGreeting();
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
    const quoteOfTheDayEl = document.getElementById("quoteOfTheDay");

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
        const response = await fetch("https://ipwho.is");                    
        const data = await response.json();

        console.log(`Lat: ${data.latitude} Lon: ${data.longitude}`);
        getWeather(data.latitude, data.longitude);
    } catch (error) {
        console.error("Failed to obtain lat and lon from https://ipwho.is: ", error);
    }


}

async function getWeather(lat, lon) {
    const codes = { 0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "foggy", 48: "foggy", 51: "light drizzle", 61: "rain", 80: "rain showers", 95: "thunderstorm" };
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
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
    }
}

async function getQuoteOfTheday() {
    const quoteOfTheDayEl = document.getElementById("quoteOfTheDay");
    const qotdEl = document.getElementById("qotd");
    const quoteAuthorEl = document.getElementById("quoteAuthor");
    fontsize = parseFloat(window.getComputedStyle(quoteOfTheDayEl).fontSize);
    qotdEl.style.width = document.getElementById("tc").offsetWidth - fontsize * 1.25 + 'px';
    try {
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev/quote");
        const data = await result.json();

        console.log(data);

        quoteOfTheDayEl.textContent = `"${data.text}"`;
        quoteAuthorEl.textContent = `- ${data.author}`;
    } catch (e) {
        console.log(`Failed to obtain quote: ${e}`);
    }
    positionAIBox();
}

function initApp() {

    setInterval(() => {
        getLocation();
        updateGreeting();
    }, 3600000);
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
        setupEl.style.visibility = "hidden";
        warningTxt.style.visibility = "hidden"
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
        greet = `${night[Math.floor(Math.random() * evening.length)]} ${localStorage.getItem("username")}?`;
    }

    greetingEl.textContent = greet;
}

document.fonts.ready.then(() => {
    document.body.style.visibility = "visible";
    initApp();
});