let scale = 1;
let lastScale = 1;
let posX = 0;
let posY = 0;
let lastX = 0;
let lastY = 0;
let dragging = false;

var imgs = element.imgs;

function updateTransform() {
  imgs.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

imgs.addEventListener('gesturestart', e => {
  e.preventDefault();
  lastScale = scale;
});

imgs.addEventListener('gesturechange', e => {
  e.preventDefault();
  scale = Math.max(1, Math.min(lastScale * e.scale, 5)); // clamp zoom between 1x and 5x
  updateTransform();
});

imgs.addEventListener('gestureend', e => {
  e.preventDefault();
  lastScale = scale;
});

imgs.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    dragging = true;
    lastX = e.touches[0].clientX - posX;
    lastY = e.touches[0].clientY - posY;
  }
});

imgs.addEventListener('touchmove', e => {
  if (dragging && e.touches.length === 1) {
    e.preventDefault();
    posX = e.touches[0].clientX - lastX;
    posY = e.touches[0].clientY - lastY;
    updateTransform();
  }
});

imgs.addEventListener('touchend', e => {
  if (e.touches.length === 0) {
    dragging = false;
  }
});

imgs.addEventListener("wheel", e => {
  e.preventDefault();
  posX -= e.deltaX;
  posY -= e.deltaY;
  updateTransform();
});
