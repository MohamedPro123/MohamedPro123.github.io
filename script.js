// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Ensure the window has initial left/top
const rect = windowEl.getBoundingClientRect();
windowEl.style.position = "absolute";
windowEl.style.left = rect.left + "px";
windowEl.style.top = rect.top + "px";

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;

  
  const rect = windowEl.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.body.style.userSelect = "none";
  windowEl.style.zIndex = 1000; // bring to front while dragging
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Clamp to viewport (optional, prevents moving off-screen)
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
;









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

const openBtn = document.getElementById("openWindowBtn");
const myWindow = document.querySelector(".window");
const closeBtn = myWindow.querySelector('[aria-label="Close"]');

openBtn.addEventListener("click", () => {
  myWindow.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  myWindow.style.display = "none";
});
