/* ==========================================
   Animation & Visual Coordination Engine
   ================================---------- */

/**
 * Highlights a specific OSI layer on either the source or destination stack
 * @param {string} side - 'source' or 'dest'
 * @param {number} layerId - Layer ID (1 to 7)
 */
function highlightLayerCard(side, layerId) {
    // Clear active class from all cards on the specified side
    document.querySelectorAll(`[id^="${side}-l-"]`).forEach(el => {
        el.classList.remove('active');
    });

    // Add active class to target layer card
    const targetCard = document.getElementById(`${side}-l-${layerId}`);
    if (targetCard) {
        targetCard.classList.add('active');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Clears all active layer highlights across both stacks
 */
function clearAllHighlights() {
    document.querySelectorAll('.layer-card').forEach(el => {
        el.classList.remove('active');
    });
}

/**
 * Triggers the flying packet animation across the transmission hub
 * @param {string} label - Text to display inside the moving packet capsule
 */
function animatePacketFlight(label = "Data / Bits") {
    const packetCapsule = document.getElementById("flyingPacket");
    const packetLabel = document.getElementById("packetLabel");

    if (!packetCapsule || !packetLabel) return;

    packetLabel.innerText = label;
    packetCapsule.classList.remove("hidden");
    packetCapsule.classList.add("animate-flight");

    // Hide capsule after animation completes (2 seconds)
    setTimeout(() => {
        packetCapsule.classList.remove("animate-flight");
        packetCapsule.classList.add("hidden");
    }, 2000);
}