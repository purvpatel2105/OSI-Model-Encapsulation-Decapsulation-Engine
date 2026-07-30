/* ==========================================
   Layer Rendering & Modal Interaction Engine
   ================================---------- */

document.addEventListener("DOMContentLoaded", () => {
    renderLayerStacks();
    setupLayerModal();
});

/**
 * Renders both Source and Destination OSI Layer Stacks
 */
function renderLayerStacks() {
    const sourceStack = document.getElementById("sourceStack");
    const destStack = document.getElementById("destStack");

    if (!sourceStack || !destStack) return;

    sourceStack.innerHTML = "";
    destStack.innerHTML = "";

    // Source PC Stack: Encapsulation Order (Top-Down: Layer 7 down to Layer 1)
    [...OSI_LAYERS].reverse().forEach(layer => {
        sourceStack.innerHTML += `
            <div class="layer-card" id="source-l-${layer.id}" data-layer-id="${layer.id}">
                <div class="layer-info">
                    <strong>L${layer.id}</strong>: ${layer.name}
                </div>
                <span class="badge">${layer.protocols[0]}</span>
            </div>
        `;
    });

    // Destination PC Stack: Decapsulation Order (Bottom-Up: Layer 1 up to Layer 7)
    OSI_LAYERS.forEach(layer => {
        destStack.innerHTML += `
            <div class="layer-card" id="dest-l-${layer.id}" data-layer-id="${layer.id}">
                <div class="layer-info">
                    <strong>L${layer.id}</strong>: ${layer.name}
                </div>
                <span class="badge">${layer.protocols[0]}</span>
            </div>
        `;
    });
}

/**
 * Sets up click event listeners on layer cards to open detailed modal view
 */
function setupLayerModal() {
    const modal = document.getElementById("layerModal");
    const closeModal = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalLayerTitle");
    const modalBody = document.getElementById("modalLayerBody");

    if (!modal) return;

    // Listen for clicks across the document on any layer card
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".layer-card");
        if (!card) return;

        const layerId = parseInt(card.getAttribute("data-layer-id"));
        const layerData = OSI_LAYERS.find(l => l.id === layerId);

        if (layerData) {
            modalTitle.innerText = `Layer ${layerData.id}: ${layerData.name}`;
            modalBody.innerHTML = `
                <p><strong>PDU Type:</strong> <code>${layerData.pdu}</code></p>
                <p><strong>Description:</strong> ${layerData.description}</p>
                <p><strong>Working Method:</strong> ${layerData.working}</p>
                <p><strong>Key Protocols:</strong> ${layerData.protocols.join(', ')}</p>
                <p><strong>Ports / Addressing:</strong> ${Array.isArray(layerData.ports) ? layerData.ports.join(', ') : layerData.ports}</p>
            `;
            modal.classList.remove("hidden");
        }
    });

    // Close modal triggers
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
}