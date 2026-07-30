/* ==========================================
   Global UI & Notification Management Engine
   ================================---------- */

document.addEventListener("DOMContentLoaded", () => {
    initUIComponents();
});

function initUIComponents() {
    // Highlight active navbar link based on current page filename
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * Utility to trigger toast notifications or alert boxes inside the app
 * @param {string} message 
 * @param {string} type ('success' | 'warning' | 'info')
 */
function showToast(message, type = "info") {
    let toastContainer = document.getElementById("toastContainer");
    
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toastContainer";
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    let borderColor = "#38bdf8";
    if (type === "success") borderColor = "#22c55e";
    if (type === "warning") borderColor = "#f59e0b";

    toast.style.cssText = `
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid ${borderColor};
        color: #f8fafc;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 0.85rem;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        animation: logSlideIn 0.3s ease-out forwards;
    `;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}