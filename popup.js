document.addEventListener("DOMContentLoaded", () => {
    // Initialize speed value in storage if not set
    if (chrome.storage.local.get("speed") === undefined) {
    chrome.storage.local.set({ speed: 1.00 }).then(() => {
        console.log("Default speed was set");
    });
    currentSpeedValue = 1.00;
    }
    else {
        currentSpeedValue = chrome.storage.local.get("speed");
    }

    currentSpeed = document.getElementById("currentSpeed");

    // Set the current speed value in the input field from user input
    currentSpeed.addEventListener("change", () => {
        const newValue = parseFloat(currentSpeed.value).toFixed(2);
        if (!isNaN(newValue) && newValue >= 0.01) {
            updateSpeed(newValue);
        } 
        else {
            updateSpeed(chrome.storage.local.get("speed"));
        }
        currentSpeed.value = newValue;
        console.log("New speed value:", newValue);
    });

    // Function to update the speed in storage and UI and apply it to all videos
    function updateSpeed(rate) {
        console.log("Current speed value:", currentSpeedValue);
        if (isNaN(currentSpeedValue)) {
            rate = 1.00;
        }
        else if (rate <= 0) {
            rate = 0.01;
        }
        currentSpeed.value = parseFloat(rate).toFixed(2);
        chrome.storage.local.set({ speed: parseFloat(rate).toFixed(2) });
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
            chrome.storage.local.set({ speed: currentSpeedValue });
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