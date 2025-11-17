document.addEventListener("DOMContentLoaded", () => {
    // Initialize speed value in storage if not set
    chrome.storage.local.get(["speed"], (result) => {
        currentSpeedValue = result.speed ?? 1.00;
        document.getElementById("currentSpeed").value = currentSpeedValue.toFixed(2);
        console.log("Initialized speed value:", currentSpeedValue.toFixed(2));
    });

    // Set the current speed value in the input field from user input
    const currentSpeed = document.getElementById("currentSpeed");
    currentSpeed.addEventListener("change", () => {
        let rate = parseFloat(currentSpeed.value);
        if (isNaN(rate)) {
            rate = 1.00;
        }
        else if (rate <= 0) {
            rate = 0.01;
        }
        applySpeed(rate);
    });

    // Function to update the speed in storage and UI and apply it to all videos
    function applySpeed(rate) {
        if (rate <= 0) {
            console.log("Speed value was less than or equal to 0, set to minimum:", rate);
            rate = 0.01;
        }
        currentSpeed.value = parseFloat(rate).toFixed(2);
        chrome.storage.local.set({ speed: rate });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "applySpeed", rate });
        
        });

    }

    // Function to calculate new speed based on increment/decrement buttons
    // Calls updateSpeed with the new calculated speed
    function adjustSpeed(change) {
        let rate = parseFloat(currentSpeed.value) + change;
        if (rate <= 0) rate = 0.01;
        applySpeed(rate);
    }

    // Increase/decrease current speed shown in input by 0.1 and 1
    document.getElementById("increaseTenths").addEventListener("click", () => adjustSpeed(0.1));
    document.getElementById("decreaseTenths").addEventListener("click", () => adjustSpeed(-0.1));
    document.getElementById("increaseWhole").addEventListener("click", () => adjustSpeed(1));
    document.getElementById("decreaseWhole").addEventListener("click", () => adjustSpeed(-1));

    // Add event listeners for preset speed buttons (increments of 0.25)
    const presetRates = [0.25, 0.5, 0.75, 1.00, 1.25, 1.5, 1.75, 2.00, 2.25, 2.5, 2.75, 3.00];

    presetRates.forEach(rate => {
        const btn = document.getElementById(`${rate}x`);
        if (btn) {
            btn.addEventListener("click", () => applySpeed(rate));
        }
    });
});