// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// CALL THIS FUNCTION TO SHOW THE WINDOW
function openWindow() {
  windowEl.style.display = "block"; // 1. Make it visible in the center
  
  const rect = windowEl.getBoundingClientRect(); // 2. Grab its real screen coordinates
  
  // 3. Lock it into absolute pixel positions
  windowEl.style.left = rect.left + window.scrollX + "px";
  windowEl.style.top = rect.top + window.scrollY + "px";
  
  // 4. Remove the transform so it doesn't fight the dragging math
  windowEl.style.transform = "none";
}

// --- Dragging Logic ---
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

  // Calculates new position based on cursor and offset
  const newLeft = e.clientX - offsetX;
  const newTop = e.clientY - offsetY;

  windowEl.style.left = newLeft + "px";
  windowEl.style.top = newTop + "px";
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

