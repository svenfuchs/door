window.addEventListener("load", () => {
  let scale = 1;
  let lastScale = 1;
  let posX = 0;
  let posY = 0;
  let lastX = 0;
  let lastY = 0;
  // let origX = 0;
  // let origY = 0;
  let dragging = false;

  var body = document.body;
  var imgs = document.getElementById('imgs');
  var sliders = document.querySelector('input[type=range]');

  function updateTransform() {
    // imgs.style.transformOrigin = `${origX}% ${origY}%`
    imgs.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

  body.addEventListener('gesturestart', e => {
    e.preventDefault();
    lastScale = scale;
  });

  body.addEventListener('gesturechange', e => {
    e.preventDefault();
    // origX = e.offsetX * 100 / imgs.offsetWidth;
    // origY = e.offsetY * 100 / imgs.offsetHeight;
    scale = Math.max(0.1, Math.min(lastScale * e.scale, 5)); // clamp zoom between 0.1x and 5x
    updateTransform();
  });

  body.addEventListener('gestureend', e => {
    e.preventDefault();
    lastScale = scale;
  });

  body.addEventListener('touchstart', e => {
    e.preventDefault();
    if (e.touches.length === 1) {
      dragging = true;
      lastX = e.touches[0].clientX - posX;
      lastY = e.touches[0].clientY - posY;
    }
    return false;
  });

  body.addEventListener('touchmove', e => {
    e.preventDefault();
    if (dragging && e.touches.length === 1) {
      posX = e.touches[0].clientX - lastX;
      posY = e.touches[0].clientY - lastY;
      updateTransform();
    }
    return false;
  });

  body.addEventListener('touchend', e => {
    e.preventDefault();
    if (e.touches.length === 0) {
      dragging = false;
    }
  });

  body.addEventListener("wheel", e => {
    e.preventDefault();
    posX -= e.deltaX;
    posY -= e.deltaY;
    updateTransform();
  });

  sliders.addEventListener("touchmove", e => {
    console.log(e);
    e.preventDefault();
    return false;
  });
});
