    const windowElement = document.querySelector('.window');
    const titleBar = document.querySelector('.title-bar');

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    titleBar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.title-bar-controls')) return;

      isDragging = true;
      titleBar.style.cursor = 'grabbing';

      startX = e.clientX;
      startY = e.clientY;
      initialLeft = windowElement.offsetLeft;
      initialTop = windowElement.offsetTop;

      document.addEventListener('mousemove', dragWindow);
      document.addEventListener('mouseup', stopDragging);
    });

    function dragWindow(e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      windowElement.style.left = `${initialLeft + dx}px`;
      windowElement.style.top = `${initialTop + dy}px`;
    }

    function stopDragging() {
      isDragging = false;
      titleBar.style.cursor = 'grab';
      document.removeEventListener('mousemove', dragWindow);
      document.removeEventListener('mouseup', stopDragging);
    }
