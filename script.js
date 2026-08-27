// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// CALL THIS FUNCTION TO SHOW AND CENTER THE WINDOW PERFECTLY
function openWindow() {
  windowEl.style.display = "block"; // Make visible so dimensions are readable
  
  // Calculate the perfect center based on the actual viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const windowWidth = windowEl.offsetWidth;
  const windowHeight = windowEl.offsetHeight;
  
  // Math: (Screen space - Window space) / 2 + current scroll offset
  const centerLeft = (viewportWidth - windowWidth) / 2 + window.scrollX;
  const centerTop = (viewportHeight - windowHeight) / 2 + window.scrollY;
  
  // Apply raw pixel positions directly
  windowEl.style.left = centerLeft + "px";
  windowEl.style.top = centerTop + "px";
}

// --- Dragging Logic (Recalculated on mousedown to prevent jumping) ---
titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  
  // Use offsetLeft/offsetTop directly to match style settings perfectly
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;

  document.body.style.userSelect = "none";
  windowEl.style.zIndex = 1000;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

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

