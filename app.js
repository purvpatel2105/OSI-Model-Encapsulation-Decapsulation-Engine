/* ==========================================
   Global Application Initialization & State
   ================================---------- */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    console.log("🌐 OSI Layer Visualizer Pro initialized successfully.");

    // Add smooth scrolling behavior across internal anchor links if any exist
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Setup global tooltips or interactive enhancements if needed
    setupGlobalEnhancements();
}

function setupGlobalEnhancements() {
    // Check if we are on about.html or guide.html and dynamically populate content if required
    const pageBody = document.body;
    if (pageBody) {
        pageBody.style.opacity = "0";
        pageBody.style.transition = "opacity 0.4s ease-in-out";
        setTimeout(() => {
            pageBody.style.opacity = "1";
        }, 50);
    }
}