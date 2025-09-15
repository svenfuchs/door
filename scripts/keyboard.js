function decr(key) {
  filter[key] -= space[key].step;
  if(filter[key] < space[key].min) { filter[key] = space[key].max };
}

function incr(key) {
  filter[key] += space[key].step;
  if(filter[key] > space[key].max) { filter[key] = space[key].min };
}

element.body.addEventListener('keydown', function(e) {
  switch(e.code) {
    case 'ArrowLeft':
      decr(state.key);
      break;
    case 'ArrowRight':
      incr(state.key);
      break;
    case 'Space':
      toggleAccent();
      break;
    // case 'KeyA':
    //   setElement('accent');
    //   break;
    // case 'KeyD':
    //   setElement('door');
    //   break;
  }
  update();

  e.preventDefault;
  e.stopPropagation();
  return false;
});
