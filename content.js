// script that accesses the web page's context and applies the stored speed to all video elements
document.addEventListener("DOMContentLoaded", () => {
    function applyStoredSpeed() {
    chrome.storage.sync.get(["speed"], (result) => {
        const rate = result.speed ?? 1.00;
        document.querySelectorAll("video").forEach(video => {
        video.playbackRate = rate;
        });
        console.log("Applied playback rate to videos:", rate);
    });
    }

    // ensure the website isn't overriding the playback rate
    setInterval(applyStoredSpeed, 1000);

    applyStoredSpeed();
});