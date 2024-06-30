const logDiv = document.getElementById("log");
const stateDiv = document.getElementById("state");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const exportBtn = document.getElementById("export-btn");
const clearBtn = document.getElementById("clear-btn");
const keyFrequencyDiv = document.getElementById("key-frequency");

let keyFrequency = {};

startBtn.addEventListener("click", () => {
    document.addEventListener("keydown", handleDown);
    document.addEventListener("keyup", handleUp);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    document.removeEventListener("keydown", handleDown);
    document.removeEventListener("keyup", handleUp);
    logDiv.textContent = " ";
    stateDiv.textContent = " ";
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

exportBtn.addEventListener("click", () => {
    exportLogs();
});

clearBtn.addEventListener("click", () => {
    logDiv.textContent = " ";
    stateDiv.textContent = " ";
    keyFrequency = {};
    keyFrequencyDiv.innerHTML = "";
});

function handleDown(e) {
    logDiv.textContent = `Key ${e.key} pressed down`;
    stateDiv.textContent = "key is down";
    updateKeyFrequency(e.key);
}

function handleUp(e) {
    logDiv.textContent = `Key ${e.key} pressed up`;
    stateDiv.textContent = "key is up";
}

function updateKeyFrequency(key) {
    if (keyFrequency[key]) {
        keyFrequency[key]++;
    } else {
        keyFrequency[key] = 1;
    }
    displayKeyFrequency();
}

function displayKeyFrequency() {
    keyFrequencyDiv.innerHTML = "";
    for (const key in keyFrequency) {
        const keyElement = document.createElement("div");
        keyElement.textContent = `${key}: ${keyFrequency[key]}`;
        keyFrequencyDiv.appendChild(keyElement);
    }
}

function exportLogs() {
    const logData = {
        keyFrequency
    };
    const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keylogger_logs.json";
    a.click();
    URL.revokeObjectURL(url);
}
