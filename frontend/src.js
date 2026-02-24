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
  
  document.getElementById("dataUpload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
            const fileData = JSON.parse(e.target.result);
            for (const key in fileData) {
                localStorage.setItem(key, fileData[key]);
            }
            hidePistonSettings();
            alert("Data successfully imported!");
            window.location.reload();
        } catch (error) {
            alert(`Invalid JSON file: ${error}`);
        }
      }
      fileReader.readAsText(file);
    }
  });
}

function exportDataFunc() {
    const data = JSON.stringify(localStorage, null, 2);
    const  blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "piston-ai-data.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function deleteAllData() {
    const deleteAllDataPromptEl = document.getElementById("deleteAllDataPrompt");
    const rectWidth = deleteAllDataPromptEl.getBoundingClientRect().width;
    const rectHeight = deleteAllDataPromptEl.getBoundingClientRect().height;
    deleteAllDataPromptEl.style.left = (window.innerWidth - rectWidth) / 2 + 'px';
    deleteAllDataPromptEl.style.top = (window.innerHeight - rectHeight) / 2 + 'px';
    deleteAllDataPromptEl.style.visibility = "visible";
    deleteAllDataPromptEl.style.opacity = "0";
    deleteAllDataPromptEl.addEventListener("transitionend", () => {
        deleteAllDataPromptEl.style.opacity = "1";
        document.body.classList.add("blur-active");
    })

}

function hideDeleteAllData() {
    const deleteAllDataPromptEl = document.getElementById("deleteAllDataPrompt");
    deleteAllDataPromptEl.style.opacity = "1";
    deleteAllDataPromptEl.style.opacity = "0";
    deleteAllDataPromptEl.addEventListener("transitionend", () => {
        deleteAllDataPromptEl.style.visibility = "hidden";
        document.body.classList.remove("blur-active");
    })
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
    const tcEl = document.getElementById("tc");
    const AIboxEl = document.getElementById("AIbox");
    if (AIboxout === true) {
        const target_y = window.innerHeight - AIboxEl.offsetHeight * 0.16;
        const rel_y = target_y - AIboxEl.offsetTop;
        AIboxEl.style.transform = `translate(0, ${rel_y}px)`;
        AIboxout = false;
    } else if (AIboxout === false) {
        const target_y = tcEl.offsetTop + tcEl.offsetHeight + 10;
        const rel_y = target_y - AIboxEl.offsetTop;
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

    AIboxEl.style.top = tcEl.offsetTop + tcEl.offsetHeight + 10 + 'px';
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
    positionTodoBox(true);
    autoRemoveTasks();
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
        let AdditionalData = `Additional data: \nweather data:${localStorage.getItem("weatherData")}\ndate (DD/MM/YYYY): ${now.getDate().toString().padStart(2,"0")}/${now.getMonth().toString().padStart(2,"0")}/${now.getFullYear}\ntime (hour:minute): ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}\nuser todo list:${localStorage.getItem("todoList")}`;
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
            throw `POST https://piston-ai.chanyanyan3205.cloudflare.com/ ${result.statusText}`;
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
            const lineBreak = document.createElement("br");
            lineBreak.style.lineHeight = 2.0;
            AIboxEl.appendChild(lineBreak);
            return;
        } else {
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
        }
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

async function getWeather() {
    const codes = { 0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "foggy", 48: "foggy", 51: "light drizzle", 61: "rain", 80: "rain showers", 95: "thunderstorm" };
    try {
        const response = await fetch(`https://piston-ai.chanyanyan3205.workers.dev/weather`, {
            signal: AbortSignal.timeout(5000)
        });
        const data = await response.json();
        console.log(data);

        const temp = data.current_weather.temperature.toString();
        const code = codes[data.current_weather.weathercode];
        const tempUnit = data.current_weather_units.temperature;

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

function positionTodoBox(resize) {
    const tcEl = document.getElementById("tc");
    const todoBoxEl = document.getElementById("todoBox");

    const rect = tcEl.getBoundingClientRect();
    todoBoxEl.style.top = rect.top + rect.height + 25 + 'px';
    todoBoxEl.style.visibility = "hidden";
    todoBoxEl.style.width = rect.width + rect.width * 0.1 * 2 + 'px';
    todoBoxEl.style.left = rect.left - ((todoBoxEl.getBoundingClientRect().width - rect.width) / 2) + 'px';
    if (todoBoxEl.getBoundingClientRect().left + todoBoxEl.getBoundingClientRect().width > document.getElementById("AIbox").getBoundingClientRect().left) {
        todoBoxEl.style.left = document.getElementById("AIbox").getBoundingClientRect().left - todoBoxEl.getBoundingClientRect().width - 15 + 'px';
    }

    todoBoxEl.style.visibility = "visible";
    if (!resize) {
        const createReminderEl = document.getElementById("createReminder");
        createReminderEl.style.left = createReminderEl.offsetLeft - createReminderEl.offsetWidth - 16 + 'px';
        window.createReminderState = false;
        createReminderEl.onclick = () => {
            if (!createReminderState) {
                createReminder();
            } else {
                removeReminder();
            }
        }
    }
    renderTasks();
}

function removeReminder() {
    const todoListEl = document.getElementById("todoList");
    createReminderState = false;
    const createReminderImg = document.getElementById("createReminderImg");
    createReminderImg.style.rotate = "0deg";
    createReminderImg.addEventListener("transitionend", () => {
        todoListEl.innerHTML = "";
        renderTasks();
    });
}

function createReminder() {
    createReminderState = true;
    const createReminderImgEl = document.getElementById("createReminderImg");
    createReminderImgEl.style.rotate = "45deg"
    createReminderImg.addEventListener("transitionend", () => {
        const todoListEl = document.getElementById("todoList");
        todoListEl.innerHTML = "";
        todoListEl.textContent = "";
        const inputFields = document.createElement("div");
        inputFields.style.display = "flex";
        inputFields.style.backgroundColor = "white";
        inputFields.style.border = "none";
        inputFields.style.borderRadius = "13px";
        inputFields.style.justifyContent = "center";
        inputFields.style.alignItems = "center";
        inputFields.style.flexDirection = "column";
        inputFields.style.overflowX = "hidden";
        inputFields.style.overflowY = "hidden";
        inputFields.style.width = "90%";

        const saveReminder = document.createElement("button");
        saveReminder.style.border = "none";
        saveReminder.textContent = "Save task";
        saveReminder.style.borderRadius = "10px";
        saveReminder.style.color = "black";
        saveReminder.style.backgroundColor = "white";
        saveReminder.style.padding = "1px 0.5em 1px 0.5em";
        saveReminder.style.cursor = "pointer";
        saveReminder.style.opacity = "100%";
        saveReminder.style.fontSize = "1em";
        saveReminder.style.width = "90%";
        saveReminder.style.transition = "opacity 0.2s ease-in-out";
        saveReminder.addEventListener("hover", () => {
            saveReminder.style.opacity = "60%";
        })
        saveReminder.disabled = true;
        saveReminder.style.cursor = "not-allowed";
        saveReminder.style.opacity = "20%";

        const titleField = document.createElement("input");
        titleField.style.border = "none";
        titleField.placeholder = "Title";
        titleField.style.width = "100%";
        titleField.style.height = "2.5em";
        titleField.style.padding = "0 0.5em 0 0.5em";
        titleField.style.boxSizing = "border-box";
        titleField.style.color = "black";

        const warningTitleField = document.createElement("p");
        warningTitleField.style.color = "red";
        warningTitleField.style.visibility = "hidden";
        warningTitleField.textContent = "Title cannot be empty.";
        warningTitleField.style.fontSize = "0.85em";
        warningTitleField.style.borderRadius = "10px";
        warningTitleField.style.backdropFilter = "blur(3px)";
        warningTitleField.style.backgroundColor = "rgba(0,0,0,0.135)";
        warningTitleField.style.padding = "1px 1em 1px 1em";
        titleField.addEventListener("input", () => {
            if (!(titleField.value.replace(/\s+/g, "")) || !titleField.value) {
                warningTitleField.style.visibility = "visible";
                saveReminder.disabled = true;
                saveReminder.style.cursor = "not-allowed";
                saveReminder.style.opacity = "20%";
            } else {
                warningTitleField.style.visibility = "hidden";
                saveReminder.disabled = false;
                saveReminder.style.cursor = "pointer";
                saveReminder.style.opacity = "100%";
            }
        })

        const descriptionField = document.createElement("input");
        descriptionField.style.border = "100%";
        descriptionField.placeholder = "Description";
        descriptionField.style.border = "none";
        descriptionField.style.width = "100%";
        descriptionField.style.height = "2.5em";
        descriptionField.style.padding = "0 0.5em 0 0.5em";
        descriptionField.style.boxSizing = "border-box";
        descriptionField.style.color = "black";

        const separatorEl = document.createElement("hr");
        separatorEl.style.height = "1px";
        separatorEl.style.width = "95%";
        separatorEl.style.backgroundColor = "rgba(0,0,0,0.5)";
        separatorEl.style.border = "none";
        
        const urlField = document.createElement("input");
        urlField.style.border = "100%";
        urlField.placeholder = "URL";
        urlField.style.border = "none";
        urlField.style.width = "100%";
        urlField.style.height = "2.5em";
        urlField.style.padding = "0 0.5em 0 0.5em";
        urlField.style.boxSizing = "border-box";
        urlField.style.color = "black";

        const deadLineContainer = document.createElement("div");
        deadLineContainer.style.display = "flex";
        deadLineContainer.style.backgroundColor = "white";
        deadLineContainer.style.border = "none";
        deadLineContainer.style.borderRadius = "13px";
        deadLineContainer.style.flexDirection = "column";
        deadLineContainer.style.overflowX = "hidden";
        deadLineContainer.style.overflowY = "hidden";
        deadLineContainer.style.width = "90%";
        deadLineContainer.style.textAlign = "center";

        const deadLineHint = document.createElement("p");
        deadLineHint.style.color = "black";
        deadLineHint.textContent = "Deadline";
        deadLineHint.style.fontSize = "0.85em";
        deadLineHint.style.padding = "5px 1em 1px 1em";

        const deadLineSeparator = document.createElement("hr");
        deadLineSeparator.style.height = "1px";
        deadLineSeparator.style.width = "95%";
        deadLineSeparator.style.backgroundColor = "rgba(0,0,0,0.5)";
        deadLineSeparator.style.border = "none";
        deadLineSeparator.style.margin = "0 auto";

        const deadLineField = document.createElement("input");
        deadLineField.type = "date";
        deadLineField.style.border = "100%";
        deadLineField.style.border = "none";
        deadLineField.style.height = "2.5em";
        deadLineField.style.padding = "0 0.5em 0 0.5em";
        deadLineField.style.boxSizing = "border-box";
        deadLineField.style.color = "black";
        deadLineField.style.borderRadius = "13px"
        deadLineField.style.width = "100%";
        deadLineContainer.appendChild(deadLineHint);
        deadLineContainer.appendChild(deadLineSeparator);
        deadLineContainer.appendChild(deadLineField);
        const now = new Date();

        const warningDeadLineEl = document.createElement("p");
        warningDeadLineEl.style.color = "red";
        warningDeadLineEl.style.visibility = "hidden";
        warningDeadLineEl.textContent = "Deadline must be set to today or after.";
        warningDeadLineEl.style.fontSize = "0.85em";
        warningDeadLineEl.style.borderRadius = "10px";
        warningDeadLineEl.style.backdropFilter = "blur(3px)";
        warningDeadLineEl.style.backgroundColor = "rgba(0,0,0,0.135)";
        warningDeadLineEl.style.padding = "1px 1em 1px 1em";
        deadLineField.addEventListener("change", () => {
            const sel = new Date(deadLineField.value);
            if (!sel) return;
            const today = now.setHours(0,0,0,0);
            
            if (sel < today) {
                warningDeadLineEl.style.visibility = "visible";
            } else if (sel > today) {
                warningDeadLinesEl.style.visibility = "hidden";
            }
        })
        
        saveReminder.onclick = () => {
            appendReminder(titleField.value, descriptionField.value, urlField.value, deadLineField.value);
        }

        inputFields.appendChild(titleField);
        inputFields.appendChild(descriptionField);
        inputFields.appendChild(separatorEl);
        inputFields.appendChild(urlField);
        todoListEl.appendChild(inputFields);
        todoListEl.appendChild(warningTitleField);
        todoListEl.appendChild(deadLineContainer);
        todoListEl.appendChild(warningDeadLineEl);
        todoListEl.appendChild(saveReminder);
    });
}

function appendReminder(title, description, url, deadline) {
    let reminders = localStorage.getItem("todoList");
    if (!reminders) {
        localStorage.setItem("todoList", "[]");
        reminders = [];
    } else {
        reminders = JSON.parse(reminders);
    }
    if (!title) { return };
    const payload = {
        Title: title,
        Description: description,
        URL: url,
        Deadline: deadline
    }

    reminders.push(payload);
    localStorage.setItem("todoList",JSON.stringify(reminders));

    removeReminder();
}

function renderTasks() {
    createReminderState = false;
    const todoListEl = document.getElementById("todoList");
    let tasks = JSON.parse(localStorage.getItem("todoList"));
    if (!tasks || tasks.length === 0) {
        localStorage.setItem("todoList", "[]");
        todoListEl.style.alignItems = "center";
        todoListEl.style.justifyItems = "center";
        todoListEl.textContent = "All tasks done! Yay!";
        return;
    } 
    todoListEl.innerHTML = "";
    for (const [idx, item] of tasks.entries()) {
        const itemContainer = document.createElement("div");
        itemContainer.style.display = "flex";
        itemContainer.style.flexDirection = "row";
        itemContainer.style.overflow = "hidden";
        itemContainer.style.backgroundColor = "rgba(0,0,0,0.05)";
        itemContainer.style.backdropFilter = "blur(3px)";
        itemContainer.style.border = "1px solid gray";
        itemContainer.style.borderRadius = "10px";
        itemContainer.style.padding = "0.3em 0 0.3em 0.3em";
        itemContainer.style.transition = "background-color 0.2s ease-in-out";
        itemContainer.style.gap = "1em";
        itemContainer.addEventListener("mouseover", () => {
            itemContainer.style.backgroundColor = "rgba(0,0,0,0.3)";
        })
        itemContainer.addEventListener("mouseout", () => {
            itemContainer.style.backgroundColor = "rgba(0,0,0,0.05)";
        })

        const infoContainerEl = document.createElement("div");
        infoContainerEl.style.display = "flex";
        infoContainerEl.style.flexDirection = "column";
        infoContainerEl.style.overflowX = "auto";
        infoContainerEl.style.overflowY = "auto";
        const checkEl = document.createElement("input");
        checkEl.type = "checkbox";
        checkEl.addEventListener("change", () => {
            if (checkEl.checked) {
                waitForConf = setTimeout(() => {
                    tasks.splice(idx,1);  
                    localStorage.setItem("todoList", JSON.stringify(tasks));
                    itemContainer.style.transition = "opacity 0.2s ease";
                    itemContainer.style.opacity = "0";
                    itemContainer.offsetHeight;
                    itemContainer.addEventListener("transitionend", () => {
                        itemContainer.style.visibility = "hidden";
                        renderTasks();
                    })
                }, 2500);
            } else if (!checkEl.checked) {
                clearTimeout(waitForConf);
            }
        })
        itemContainer.appendChild(checkEl);
        if (!("Title" in item)) {
            continue;
        } else {
            const itemTitleEl = document.createElement("h3");
            itemTitleEl.textContent = item.Title;
            itemTitleEl.style.color = "white";
            itemTitleEl.style.fontWeight = "350";
            infoContainerEl.appendChild(itemTitleEl); 
        } 
        if ("Description" in item) {
            if (item.Description) {
                const itemDescEl = document.createElement("h4");
                itemDescEl.textContent = " " + item.Description;
                itemDescEl.style.color = "gray";
                itemDescEl.style.fontWeight = "300";
                infoContainerEl.appendChild(itemDescEl);
            }
        }
        
        if ("URL" in item) {
            if (item.URL) {
                const itemURLEl = document.createElement("p");
                itemURLEl.textContent = `${location.protocol}//${item.URL}`;
                itemURLEl.style.cursor = "pointer";
                itemURLEl.style.textDecoration = "underline";
                itemURLEl.addEventListener("click", () => {
                    window.open(`${location.protocol}//${item.URL}`,"_blank");
                })
                itemURLEl.style.color = "cyan";
                itemURLEl.style.opacity = "30%";
                infoContainerEl.appendChild(itemURLEl);
            }
        }
        
        if ("Deadline" in item) {
            if (item.Deadline) {   
                const itemDescEl = document.createElement("p");
                itemDescEl.textContent = `Deadline: ${item.Deadline}`;
                itemDescEl.style.color = "gray";
                itemDescEl.style.fontWeight = "300";
                infoContainerEl.appendChild(itemDescEl);
            }
        }

        todoListEl.appendChild(itemContainer);
        itemContainer.appendChild(infoContainerEl);
    }
}

function autoRemoveTasks() {
    const now = Date();
    const today = new Date(now);
    today.setHours(0,0,0,0);

    let tasks = localStorage.getItem("todoList");
    if (!tasks) {
        localStorage.setItem("todoList","[]");
        return;
    }
    tasks = JSON.parse(tasks);
    const filtered = tasks.filter(item => {
        if ("Deadline" in item && item.Deadline) {
            const deadlineDate = new Date(item.Deadline);
            return today < deadlineDate;
        }
        return true;
    })
    localStorage.setItem("todoList",JSON.stringify(filtered));
    renderTasks();
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
        renderTasks(); 
        autoRemoveTasks();
        setInterval(() => {
            getLocation();
            updateGreeting();
            autoRemoveTasks();
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