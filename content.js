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
    storage.get(["speed"], (result) => {
        const rate = result.speed ?? 1.00;
        applyStoredSpeed(rate);
        console.log("Applied rate:", rate);
    });
}

// Watch for dynamically-added videos
const observer = new MutationObserver(() => loadSpeedAndApply());
observer.observe(document.body, { childList: true, subtree: true });

loadSpeedAndApply();
setInterval(loadSpeedAndApply, 1000);
