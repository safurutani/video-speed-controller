let storedSpeed = 1.00;

// Retrieve the stored speed value from local storage and apply it
chrome.storage.local.get(["speed"], (result) => {
    storedSpeed = result.speed ?? 1.00;
    console.log("Retrieved stored speed:", storedSpeed);
    applyStoredSpeed(storedSpeed);
});

// Function to apply the stored speed to all videos on the page
function applyStoredSpeed(rate) {
    document.querySelectorAll("video").forEach(v => {
        v.playbackRate = rate;
    });
    console.log("Applied speed:", rate);
    storedSpeed = rate;
}



chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "applySpeed") {
        applyStoredSpeed(msg.rate);
    }
});

// Watch for dynamically-added videos
const observer = new MutationObserver(() => applyStoredSpeed(storedSpeed));
observer.observe(document.documentElement, { childList: true, subtree: true });

// Apply the stored speed when the page loads
window.addEventListener("load", () => applyStoredSpeed(storedSpeed));
