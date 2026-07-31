/* ==========================================
   Main Simulator Control Engine (Slow & Clear Mode)
   ================================---------- */

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const userMessageInput = document.getElementById("userMessage");
    const inspectorContent = document.getElementById("inspectorContent");
    const receivedOutput = document.getElementById("receivedOutput");
    const activePhaseBadge = document.getElementById("activePhaseBadge");

    let isPaused = false;
    let isRunning = false;

    if (!startBtn) return;

    // Start Simulation Button Handler
    startBtn.addEventListener("click", async () => {
        const message = userMessageInput.value.trim();
        if (!message) {
            alert("Please enter a message or payload data first!");
            return;
        }

        if (isRunning) return;
        isRunning = true;
        isPaused = false;

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        userMessageInput.disabled = true;

        receivedOutput.innerText = "Receiving transmission...";
        receivedOutput.style.color = "var(--warning-color)";
        inspectorContent.innerHTML = `<p>🚀 Transmission Initiated from Source PC (192.168.1.10)...</p>`;

        try {
            // ==========================================
            // PHASE 1: ENCAPSULATION (Source PC: Layer 7 down to 1)
            // ==========================================
            activePhaseBadge.innerText = "Encapsulation (L7 ➔ L1)";
            activePhaseBadge.style.background = "rgba(56, 189, 248, 0.15)";
            activePhaseBadge.style.color = "var(--accent-glow)";
            activePhaseBadge.style.borderColor = "var(--accent-glow)";

            let currentPayload = message;

            for (let i = 7; i >= 1; i--) {
                if (await checkPauseState()) break;

                highlightLayerCard('source', i);
                currentPayload = appendLayerHeader(i, currentPayload, inspectorContent);
                await delay(1600); // Slowed down to 1.6 seconds for clear understanding
            }

            if (isPaused && !isRunning) return;

            // ==========================================
            // PHASE 2: TRANSMISSION HUB (Bits over physical channel)
            // ==========================================
            activePhaseBadge.innerText = "Transmission (Medium)";
            activePhaseBadge.style.background = "rgba(245, 158, 11, 0.15)";
            activePhaseBadge.style.color = "var(--warning-color)";
            activePhaseBadge.style.borderColor = "rgba(245, 158, 11, 0.3)";

            clearAllHighlights();
            inspectorContent.innerHTML += `
                <hr style="border-color: var(--border-color); margin: 8px 0;">
                <p style="color: var(--warning-color);">⚡ Converting complete frame into raw Bits (0s & 1s) and transferring across physical cables...</p>
            `;
            inspectorContent.scrollTop = inspectorContent.scrollHeight;

            animatePacketFlight("Bits 011001...");
            await delay(2500);

            // ==========================================
            // PHASE 3: DECAPSULATION (Destination PC: Layer 1 up to 7)
            // ==========================================
            activePhaseBadge.innerText = "Decapsulation (L1 ➔ L7)";
            activePhaseBadge.style.background = "rgba(34, 197, 94, 0.15)";
            activePhaseBadge.style.color = "var(--success-color)";
            activePhaseBadge.style.borderColor = "rgba(34, 197, 94, 0.3)";

            let decryptedPayload = currentPayload;

            for (let i = 1; i <= 7; i++) {
                if (await checkPauseState()) break;

                highlightLayerCard('dest', i);
                decryptedPayload = removeLayerHeader(i, decryptedPayload, inspectorContent);
                await delay(1600); // Slowed down to 1.6 seconds for clear understanding
            }

            // ==========================================
            // PHASE 4: SUCCESSFUL DELIVERY
            // ==========================================
            clearAllHighlights();
            activePhaseBadge.innerText = "Delivered Successfully";
            receivedOutput.innerText = message;
            receivedOutput.style.color = "var(--success-color)";
            
            inspectorContent.innerHTML += `
                <hr style="border-color: var(--border-color); margin: 8px 0;">
                <p style="color: var(--success-color);">✅ Data successfully delivered to Destination PC (192.168.1.50) and original message rendered!</p>
            `;
            inspectorContent.scrollTop = inspectorContent.scrollHeight;

        } catch (error) {
            console.error("Simulation error:", error);
        } finally {
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            pauseBtn.innerText = "Pause ⏸";
            userMessageInput.disabled = false;
            activePhaseBadge.innerText = "Completed";
        }
    });

    // Pause / Resume Simulation Handler
    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            pauseBtn.innerText = "Resume ▶";
            activePhaseBadge.innerText = "Paused";
        } else {
            pauseBtn.innerText = "Pause ⏸";
        }
    });

    // Reset Simulation Handler
    resetBtn.addEventListener("click", () => {
        isRunning = false;
        isPaused = false;
        clearAllHighlights();
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.innerText = "Pause ⏸";
        userMessageInput.disabled = false;

        receivedOutput.innerText = "Waiting for transmission...";
        receivedOutput.style.color = "var(--text-muted)";
        
        activePhaseBadge.innerText = "Idle";
        activePhaseBadge.style.background = "rgba(245, 158, 11, 0.15)";
        activePhaseBadge.style.color = "var(--warning-color)";
        activePhaseBadge.style.borderColor = "rgba(245, 158, 11, 0.3)";

        inspectorContent.innerHTML = `<p class="placeholder-text">Click "Send" on the Source PC to begin layer-by-layer encapsulation and transmission...</p>`;
        
        const flyingPacket = document.getElementById("flyingPacket");
        if (flyingPacket) {
            flyingPacket.classList.add("hidden");
            flyingPacket.classList.remove("animate-flight");
        }
    });

    // Helper: Appends header & PDU info during encapsulation with easy explanations
    function appendLayerHeader(layerId, payload, logContainer) {
        const layerData = OSI_LAYERS.find(l => l.id === layerId);
        let actionDesc = "";

        if (layerId === 7) actionDesc = "Formatting user message into application data.";
        if (layerId === 6) actionDesc = "Compressing & encrypting data (TLS security).";
        if (layerId === 5) actionDesc = "Establishing session control token.";
        if (layerId === 4) actionDesc = "Splitting data into Segments & adding Port numbers.";
        if (layerId === 3) actionDesc = "Adding Source & Destination IP addresses (Packets).";
        if (layerId === 2) actionDesc = "Adding MAC addresses & error checking trailer (Frames).";
        if (layerId === 1) actionDesc = "Converting frame into raw Bits (0s and 1s) for cables.";

        logContainer.innerHTML += `
            <div><strong style="color: var(--accent-glow);">[Layer ${layerId}: ${layerData.name}]</strong><br>
            action: ${actionDesc}<br>
            Protocol: <code>${layerData.protocols[0]}</code> | PDU: <code>${layerData.pdu}</code></div>
        `;
        logContainer.scrollTop = logContainer.scrollHeight;
        return `[L${layerId}-HDR] + (${payload})`;
    }

    // Helper: Removes header & PDU info during decapsulation with easy explanations
    function removeLayerHeader(layerId, payload, logContainer) {
        const layerData = OSI_LAYERS.find(l => l.id === layerId);
        let actionDesc = "";

        if (layerId === 1) actionDesc = "Reading raw electrical bits from physical cable.";
        if (layerId === 2) actionDesc = "Checking MAC address & removing Frame header.";
        if (layerId === 3) actionDesc = "Inspecting IP address & removing Network header.";
        if (layerId === 4) actionDesc = "Reassembling Segments & checking port delivery.";
        if (layerId === 5) actionDesc = "Verifying session continuity.";
        if (layerId === 6) actionDesc = "Decrypting & translating data format.";
        if (layerId === 7) actionDesc = "Extracting final message for target application.";

        logContainer.innerHTML += `
            <div><strong style="color: var(--success-color);">[Layer ${layerId}: ${layerData.name}]</strong><br>
            action: ${actionDesc}<br>
            Protocol: <code>${layerData.protocols[0]}</code> | PDU: <code>${layerData.pdu}</code></div>
        `;
        logContainer.scrollTop = logContainer.scrollHeight;
        return payload;
    }

    async function checkPauseState() {
        while (isPaused && isRunning) {
            await delay(100);
        }
        return !isRunning;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
