function updateDisplays() {
    let text = document.getElementById("textInput").value;
    let pattern = document.getElementById("patternInput").value;
    
    createDisplay("topTextDisplay", text, "char-box");  
    createDisplay("topPatternDisplay", pattern, "char-box");  
    createTextDisplay(text);
}

function createDisplay(containerId, text, className) {
    const display = document.getElementById(containerId);
    display.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.classList.add(className);
        span.innerText = text[i];
        display.appendChild(span);
    }
}

function createTextDisplay(text) {
    const display = document.getElementById("textDisplay");
    display.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        const container = document.createElement("div");
        container.classList.add("char-container");

        const indexSpan = document.createElement("span");
        indexSpan.classList.add("index-box");
        indexSpan.innerText = i;

        const charSpan = document.createElement("span");
        charSpan.classList.add("char-box");
        charSpan.innerText = text[i];
        charSpan.id = "char-" + i;

        container.appendChild(indexSpan);
        container.appendChild(charSpan);
        display.appendChild(container);
    }
}

function highlightPattern(start, length, color) {
    for (let i = 0; i < length; i++) {
        const charBox = document.getElementById("char-" + (start + i));
        if (charBox) {
            charBox.classList.add(color);
        }
    }
}

function resetHighlight() {
    document.querySelectorAll(".char-box").forEach(box => box.classList.remove("yellow", "green"));
}

let isSearching = false; // Prevent multiple clicks from glitching the animation

async function startSearch() {
    if (isSearching) return; // Prevent multiple button clicks
    isSearching = true;

    let text = document.getElementById("textInput").value;
    let pattern = document.getElementById("patternInput").value;
    let n = text.length, m = pattern.length;
    let statusDisplay = document.getElementById("statusDisplay");
    let patternStatus = document.getElementById("patternStatus");
    let foundIndices = document.getElementById("foundIndices");

    statusDisplay.innerText = "Current index = 0";
    patternStatus.innerText = "Pattern Status: Searching...";
    foundIndices.innerText = "Pattern found at: -";  // Reset previous results

    createTextDisplay(text);
    await new Promise(r => setTimeout(r, 500));

    let foundPositions = []; // To store found indices

    for (let i = 0; i <= n - m; i++) {
        resetHighlight();

        let match = true;
        for (let j = 0; j < m; j++) {
            highlightPattern(i, j + 1, "yellow"); // Highlight one by one

            let checkingSubstring = pattern.substring(0, j + 1);
            patternStatus.innerText = `Pattern Status: Checking for "${checkingSubstring}"`;

            statusDisplay.innerText = `Current index = ${i}`;
            await new Promise(r => setTimeout(r, 800));

            if (text[i + j] !== pattern[j]) {
                match = false;
                patternStatus.innerText = "Pattern Status: Not found";
                break;
            }
        }

        if (match) {
            highlightPattern(i, m, "green");
            patternStatus.innerText = "Pattern Status: Found";
            foundPositions.push(i);
            foundIndices.innerText = `Pattern found at: ${foundPositions.join(", ")}`;
            await new Promise(r => setTimeout(r, 800)); // Small delay before checking the next index
        }
    }

    if (foundPositions.length === 0) {
        patternStatus.innerText = "Pattern Status: Not found";
        foundIndices.innerText = "Pattern found at: -";
    }

    isSearching = false; // Allow new searches
}

updateDisplays();
