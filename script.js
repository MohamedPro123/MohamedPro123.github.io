// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// 1. CREATE A FUNCTION TO INITIALIZE POSITION ONLY WHEN OPENED
function initWindowPosition() {
  // Show it first so the browser can calculate its real size
  windowEl.style.display = "block"; 
  
  // Get the perfectly centered coordinates from the CSS layout
  const rect = windowEl.getBoundingClientRect();
  
  // Lock them in as absolute pixels so dragging works smoothly
  windowEl.style.position = "absolute";
  windowEl.style.left = rect.left + "px";
  windowEl.style.top = rect.top + "px";
  
  // Remove the centering layout so it doesn't fight the drag coordinates
  windowEl.style.transform = "none"; 
  windowEl.style.margin = "0";
}

// Call this function whenever you trigger the window to open!
// For example: openButton.addEventListener("click", initWindowPosition);


// --- Your existing dragging logic (kept exactly the same) ---
titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = windowEl.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = "none";
  windowEl.style.zIndex = 1000;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const newLeft = e.clientX - offsetX;
  const newTop = e.clientY - offsetY;
  windowEl.style.left = Math.max(0, newLeft) + "px";
  windowEl.style.top = Math.max(0, newTop) + "px";
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.userSelect = "";
});










// Startup sound
    document.addEventListener('click', function() {
        const audio = document.getElementById('welcome-sound');
        
        // Start playing silently
        audio.volume = 0;
        audio.play();

        // Settings for the fade-in effect
        const fadeDuration = 2000; // Time in milliseconds (2 seconds)
        const fadeInterval = 50;   // How often to increase volume (50ms)
        const volumeStep = fadeInterval / fadeDuration; // Amount to increase each step

        const fade = setInterval(function() {
            if (audio.volume < 1.0 - volumeStep) {
                audio.volume += volumeStep;
            } else {
                audio.volume = 1.0; // Ensure it finishes exactly at max volume
                clearInterval(fade); // Stop the timer
            }
        }, fadeInterval);

    }, { once: true });










// button
document.addEventListener("DOMContentLoaded", () => {

const openBtn = document.getElementById("openWindowBtn");
const myWindow = document.querySelector(".window");
const closeBtn = myWindow.querySelector('[aria-label="Close"]');

openBtn.addEventListener("click", () => {
  myWindow.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  myWindow.style.display = "none";
});
  });

