// DRAGGING

console.log("drag script loaded, update v1.1 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let pointerOffsetX = 0;
let pointerOffsetY = 0;
let previousUserSelect = "";

// Make sure the window can actually be positioned with left/top.
windowEl.style.position = windowEl.style.position || "absolute";

// CALL THIS FUNCTION TO SHOW AND CENTER THE WINDOW
function openWindow() {
  windowEl.style.display = "block";

  // Get the actual rendered dimensions.
  const rect = windowEl.getBoundingClientRect();

  const left =
    window.scrollX + (window.innerWidth - rect.width) / 2;

  const top =
    window.scrollY + (window.innerHeight - rect.height) / 2;

  windowEl.style.left = `${left}px`;
  windowEl.style.top = `${top}px`;
}

// Convert the window's current viewport position into document coordinates.
function getWindowPosition() {
  const rect = windowEl.getBoundingClientRect();

  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

// Keep at least part of the window visible.
function clampPosition(left, top) {
  const rect = windowEl.getBoundingClientRect();

  const minVisible = 40;

  const minLeft = window.scrollX - rect.width + minVisible;
  const maxLeft = window.scrollX + window.innerWidth - minVisible;

  const minTop = window.scrollY;
  const maxTop = window.scrollY + window.innerHeight - minVisible;

  return {
    left: Math.min(Math.max(left, minLeft), maxLeft),
    top: Math.min(Math.max(top, minTop), maxTop)
  };
}

titleBar.addEventListener("pointerdown", (e) => {
  // Only start dragging with the primary mouse button.
  if (e.pointerType === "mouse" && e.button !== 0) {
    return;
  }

  // Don't hijack interactive controls inside the title bar.
  if (e.target.closest("button, a, input, textarea, select")) {
    return;
  }

  e.preventDefault();

  const rect = windowEl.getBoundingClientRect();

  // Exact cursor position inside the window.
  pointerOffsetX = e.clientX - rect.left;
  pointerOffsetY = e.clientY - rect.top;

  isDragging = true;

  // Capture the pointer so dragging continues even outside the title bar.
  titleBar.setPointerCapture?.(e.pointerId);

  previousUserSelect = document.body.style.userSelect;
  document.body.style.userSelect = "none";

  // Prevent browser-native dragging/selection behavior.
  titleBar.style.cursor = "grabbing";

  // Bring the window to the front.
  windowEl.style.zIndex = "1000";
});

titleBar.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const newLeft =
    e.clientX + window.scrollX - pointerOffsetX;

  const newTop =
    e.clientY + window.scrollY - pointerOffsetY;

  const position = clampPosition(newLeft, newTop);

  windowEl.style.left = `${position.left}px`;
  windowEl.style.top = `${position.top}px`;
});

function stopDragging(e) {
  if (!isDragging) return;

  isDragging = false;

  if (e?.pointerId != null) {
    try {
      titleBar.releasePointerCapture?.(e.pointerId);
    } catch {
      // Pointer capture may already have been released.
    }
  }

  document.body.style.userSelect = previousUserSelect;
  titleBar.style.cursor = "";
}

titleBar.addEventListener("pointerup", stopDragging);
titleBar.addEventListener("pointercancel", stopDragging);
titleBar.addEventListener("lostpointercapture", stopDragging);

// If the page loses focus while dragging, don't leave the window stuck.
window.addEventListener("blur", stopDragging);

// Don't let the browser start selecting/dragging the title bar itself.
titleBar.addEventListener("dragstart", (e) => {
  e.preventDefault();
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

