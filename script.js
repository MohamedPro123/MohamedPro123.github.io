  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  let activeWindow = null;
  let activeTitleBar = null;

  // Listen globally on the document to capture clicks on any .title-bar
  document.addEventListener('mousedown', (e) => {
    const titleBar = e.target.closest('.title-bar');
    if (!titleBar) return;

    // Ignore dragging if clicking user interface action buttons
    if (e.target.closest('.title-bar-controls')) return;

    // Dynamically find the .window container relative to clicked title bar
    activeTitleBar = titleBar;
    activeWindow = titleBar.closest('.window');
    if (!activeWindow) return;

    isDragging = true;
    activeTitleBar.style.cursor = 'grabbing';

    // Store current coordinates
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = activeWindow.offsetLeft;
    initialTop = activeWindow.offsetTop;

    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDragging);
  });

  function dragWindow(e) {
    if (!isDragging || !activeWindow) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    activeWindow.style.left = `${initialLeft + dx}px`;
    activeWindow.style.top = `${initialTop + dy}px`;
  }

  function stopDragging() {
    if (activeTitleBar) {
      activeTitleBar.style.cursor = 'grab';
    }
    isDragging = false;
    activeWindow = null;
    activeTitleBar = null;

    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDragging);
  }
