// DRAGGING

console.log("drag script loaded, update v1.2 working");
const windowEl = document.querySelector(".window");
const titleBar = windowEl.querySelector(".title-bar");
const navbar = document.querySelector(".navbar");

let isDragging = false;
let pointerId = null;
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

  const position = clampPosition(left, top);

  windowEl.style.left = `${position.left}px`;
  windowEl.style.top = `${position.top}px`;
}

// --------------------------------------------------
// KEEP WINDOW ACCESSIBLE
// --------------------------------------------------

function clampPosition(left, top) {
  const windowRect = windowEl.getBoundingClientRect();
  const titleRect = titleBar.getBoundingClientRect();

  const visibleTitleBarWidth = 40;
  const visibleTitleBarHeight = 10;

  // These values describe where the title bar sits
  // relative to the window itself. They stay constant
  // during the drag.
  const titleLeftOffset =
    titleRect.left - windowRect.left;

  const titleRightOffset =
    titleRect.right - windowRect.left;

  const titleTopOffset =
    titleRect.top - windowRect.top;

  const titleBottomOffset =
    titleRect.bottom - windowRect.top;

  const minLeft =
    window.scrollX -
    titleRightOffset +
    visibleTitleBarWidth;

  const maxLeft =
    window.scrollX +
    window.innerWidth -
    titleLeftOffset -
    visibleTitleBarWidth;

  const minTop =
    window.scrollY -
    titleTopOffset;

  const maxTop =
    window.scrollY +
    window.innerHeight -
    titleBottomOffset -
    visibleTitleBarHeight;

  return {
    left: Math.max(minLeft, Math.min(left, maxLeft)),
    top: Math.max(minTop, Math.min(top, maxTop))
  };
}

// --------------------------------------------------
// SHOULD THIS POINTER START A DRAG?
// --------------------------------------------------

function canStartDrag(e) {
  // Only primary mouse button.
  if (e.pointerType === "mouse" && e.button !== 0) {
    return false;
  }

  // Never drag from the navbar.
  if (navbar && navbar.contains(e.target)) {
    return false;
  }

  // Don't drag when clicking interactive controls.
  if (
    e.target.closest(
      "button, a, input, textarea, select, option, [contenteditable='true']"
    )
  ) {
    return false;
  }

  return true;
}

// --------------------------------------------------
// START DRAGGING
// --------------------------------------------------

titleBar.addEventListener("pointerdown", (e) => {
  if (!canStartDrag(e)) {
    return;
  }

  const rect = windowEl.getBoundingClientRect();

  pointerOffsetX = e.clientX - rect.left;
  pointerOffsetY = e.clientY - rect.top;

  isDragging = true;
  pointerId = e.pointerId;

  // Capture the pointer on the title bar so dragging
  // continues even if the pointer leaves it.
  try {
    titleBar.setPointerCapture(e.pointerId);
  } catch {
    // Ignore unsupported pointer capture.
  }

  previousUserSelect = document.body.style.userSelect;
  document.body.style.userSelect = "none";

  titleBar.style.cursor = "grabbing";

  // Bring the window to the front.
  windowEl.style.zIndex = "1000";

  e.preventDefault();
});

// --------------------------------------------------
// DRAGGING
// --------------------------------------------------

titleBar.addEventListener("pointermove", (e) => {
  if (!isDragging || e.pointerId !== pointerId) {
    return;
  }

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
  if (!isDragging) {
    return;
  }

  // If this came from a pointer event, ignore unrelated pointers.
  if (
    e?.pointerId != null &&
    pointerId != null &&
    e.pointerId !== pointerId
  ) {
    return;
  }

  const activePointerId = pointerId;

  isDragging = false;
  pointerId = null;

  if (activePointerId != null) {
    try {
      if (titleBar.hasPointerCapture(activePointerId)) {
        titleBar.releasePointerCapture(activePointerId);
      }
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

// --------------------------------------------------
// OPTIONAL: MAKE DRAGGING MORE CONSISTENT
// --------------------------------------------------

// Prevent touch scrolling/gesture handling on the title bar
// while the user is attempting to drag.
titleBar.style.touchAction = "none";










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



