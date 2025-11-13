currentSpeedValue = 1.00;
document.addEventListener("DOMContentLoaded", () => {
    // Initialize speed value in storage if not set
    chrome.storage.sync.get(["speed"], (result) => {
        currentSpeedValue = result.speed ?? 1.00;
        document.getElementById("currentSpeed").value = currentSpeedValue.toFixed(2);
        console.log("Initialized speed value:", currentSpeedValue.toFixed(2));
    });

    // Set the current speed value in the input field from user input
    currentSpeed.addEventListener("change", () => {
        const newValue = parseFloat(currentSpeed.value).toFixed(2);
        if (!isNaN(newValue) && newValue >= 0.01) {
            updateSpeed(newValue);
        } 
        else {
            updateSpeed(chrome.storage.sync.get(["speed"]));
        }
        currentSpeed.value = newValue;
        console.log("New speed value:", newValue);
    });

    // Function to update the speed in storage and UI and apply it to all videos
    function updateSpeed(rate) {
        if (rate <= 0) {
            console.log("Speed value was less than or equal to 0, set to minimum:", rate);
            rate = 0.01;
        }
        currentSpeed.value = parseFloat(rate).toFixed(2);
        chrome.storage.sync.set({ speed: rate });
        console.log("Updated speed value:", rate);
        document.querySelectorAll("video").forEach(video => {
            video.playbackRate = rate;
        });

    }

    // Function to calculate new speed based on increment/decrement buttons
    // Calls updateSpeed with the new calculated speed
    function calculateNewSpeed(val) {
        if (isNaN(currentSpeed.value)) {
            currentSpeedValue = 1.00;
            currentSpeed.value = currentSpeedValue;
            chrome.storage.sync.set({ speed: currentSpeedValue });
        }
        currentSpeedValue = parseFloat(currentSpeed.value) + val;
        updateSpeed(currentSpeedValue);
    }

    // increase/decrease current speed shown in input by 0.1 and 1
    document.getElementById("increaseTenths").addEventListener("click", () => calculateNewSpeed(0.1));
    document.getElementById("decreaseTenths").addEventListener("click", () => calculateNewSpeed(-0.1));

    document.getElementById("increaseWhole").addEventListener("click", () => calculateNewSpeed(1));
    document.getElementById("decreaseWhole").addEventListener("click", () => calculateNewSpeed(-1));

    // Add event listeners for preset speed buttons (increments of 0.25)
    const presetRates = [0.25, 0.5, 0.75, 1.00, 1.25, 1.5, 1.75, 2.00, 2.25, 2.5, 2.75, 3.00];

    presetRates.forEach(rate => {
        const btn = document.getElementById(`${rate}x`);
        if (btn) {
            btn.addEventListener("click", () => updateSpeed(rate));
        }
    });
});