// DRAGGING

console.log("drag script loaded, update v1.2 working");

const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");

let isDragging = false;
let pointerOffsetX = 0;
let pointerOffsetY = 0;
let previousUserSelect = "";

// Make sure the window can be positioned with left/top.
windowEl.style.position = windowEl.style.position || "absolute";

// --------------------------------------------------
// OPEN + CENTER WINDOW
// --------------------------------------------------

function openWindow() {
  windowEl.style.display = "block";

  const rect = windowEl.getBoundingClientRect();

  const left =
    window.scrollX + (window.innerWidth - rect.width) / 2;

  const top =
    window.scrollY + (window.innerHeight - rect.height) / 2;

  windowEl.style.left = `${left}px`;
  windowEl.style.top = `${top}px`;
}

// --------------------------------------------------
// KEEP WINDOW ACCESSIBLE
// --------------------------------------------------
//
// The title bar can never completely leave the screen.
// The rest of the window is allowed to go off-screen.
//
// Change this if you want more/less of the title bar
// to remain visible.
//

function clampPosition(left, top) {
  const windowRect = windowEl.getBoundingClientRect();
  const titleRect = titleBar.getBoundingClientRect();

  const visibleTitleBarWidth = 40;
  const visibleTitleBarHeight = 10;

  // How far left the window can move.
  // At least 40px of the title bar stays visible.
  const minLeft =
    window.scrollX -
    (titleRect.right - windowRect.left) +
    visibleTitleBarWidth;

  // How far right the window can move.
  const maxLeft =
    window.scrollX +
    window.innerWidth -
    (windowRect.right - titleRect.left) -
    visibleTitleBarWidth;

  // Keep the title bar vertically on-screen.
  const minTop =
    window.scrollY -
    (titleRect.top - windowRect.top);

  const maxTop =
    window.scrollY +
    window.innerHeight -
    (titleRect.bottom - windowRect.top) -
    visibleTitleBarHeight;

  return {
    left: Math.max(minLeft, Math.min(left, maxLeft)),
    top: Math.max(minTop, Math.min(top, maxTop))
  };
}

// --------------------------------------------------
// START DRAGGING
// --------------------------------------------------

titleBar.addEventListener("pointerdown", (e) => {
  // Only allow the primary mouse button.
  if (e.pointerType === "mouse" && e.button !== 0) {
    return;
  }

  // Don't start dragging when clicking controls.
  if (e.target.closest("button, a, input, textarea, select")) {
    return;
  }

  e.preventDefault();

  const rect = windowEl.getBoundingClientRect();

  // Remember exactly where inside the window
  // the user grabbed it.
  pointerOffsetX = e.clientX - rect.left;
  pointerOffsetY = e.clientY - rect.top;

  isDragging = true;

  // Keep receiving pointer events even if the pointer
  // leaves the title bar.
  titleBar.setPointerCapture?.(e.pointerId);

  // Prevent text selection while dragging.
  previousUserSelect = document.body.style.userSelect;
  document.body.style.userSelect = "none";

  // Visual feedback.
  titleBar.style.cursor = "grabbing";

  // Bring the window to the front.
  windowEl.style.zIndex = "1000";
});

// --------------------------------------------------
// DRAGGING
// --------------------------------------------------

titleBar.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const newLeft =
    e.clientX +
    window.scrollX -
    pointerOffsetX;

  const newTop =
    e.clientY +
    window.scrollY -
    pointerOffsetY;

  const position = clampPosition(newLeft, newTop);

  windowEl.style.left = `${position.left}px`;
  windowEl.style.top = `${position.top}px`;
});

// --------------------------------------------------
// STOP DRAGGING
// --------------------------------------------------

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

// Stop dragging if the browser window loses focus.
window.addEventListener("blur", stopDragging);

// Prevent native browser dragging.
titleBar.addEventListener("dragstart", (e) => {
  e.preventDefault();
});









// BUTTONS

document.addEventListener("DOMContentLoaded", () => {
  // 1. Select ALL buttons with the class and the window elements
  const allButtons = document.querySelectorAll('.xp-task-item'); 
  const myWindow = document.querySelector(".window");
  const closeBtn = myWindow?.querySelector('[aria-label="Close"]');

  // 2. Create the audio object (Double-check this path matches your file!)
  const clickSound = new Audio('path/to/your/audio-file.mp3');

  // 3. Loop through every single button
  allButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // 🔊 EVERY button still plays the sound when clicked
      try {
        clickSound.currentTime = 0; 
        clickSound.play().catch(err => {
          console.warn("Audio failed to play, but script will continue:", err.message);
        });
      } catch (audioError) {
        console.warn("Audio error caught:", audioError.message);
      }
      
      // 🔒 ONLY target the button that says "Credits"
      if (button.textContent.includes("Credits")) {
        event.preventDefault(); // ONLY disable the link for the Credits button!
        
        if (myWindow) {
          myWindow.style.display = "block";
          console.log("Credits clicked: Link disabled and window opened!");
        }
      }
    });
  });

  // 4. Close window logic
  if (closeBtn && myWindow) {
    closeBtn.addEventListener("click", () => {
      myWindow.style.display = "none";
    });
  }
});



