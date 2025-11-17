chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "setSpeed") {
        document.querySelectorAll("video").forEach(v => {
            v.playbackRate = msg.rate;
        });
    }
});

function applyStoredSpeed(rate) {
    document.querySelectorAll("video").forEach(v => v.playbackRate = rate);
}

function loadSpeedAndApply() {
    try {
        chrome.storage.local.get(["speed"], (result) => {
            if (chrome.runtime.lastError) return;
            const value = result.speed ?? 1;
            currentSpeed.value = value.toFixed(2);
        });
    } catch (e) {
        console.warn("Popup closed early, ignoring:", e);
    }

}

// Watch for dynamically-added videos
const observer = new MutationObserver(() => loadSpeedAndApply());
observer.observe(document.body, { childList: true, subtree: true });

loadSpeedAndApply();
setInterval(loadSpeedAndApply, 1000);
