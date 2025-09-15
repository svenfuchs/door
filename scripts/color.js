const element = {
  body: document.body,
  door: document.getElementById('door'),
  accent: document.getElementById('accent'),
  elCtrl: document.getElementById('element-ctrl'),
  elLabel: document.getElementById('element-label'),
  imgs: document.getElementById('imgs'),
};

const input = {
  hue: document.getElementsByName('hue')[0],
  sat: document.getElementsByName('sat')[0],
  lgt: document.getElementsByName('lgt')[0],
  accent: document.getElementsByName('accent')[0],
  element: document.getElementsByName('element')[0],
};

var state = {
  accent: false,
  key: 'hue',
  element: 'door'
};

var filter = {
  door: {
    hue: 0,
    sat: 100,
    lgt: 100
  },
  accent: {
    hue: 0,
    sat: 100,
    lgt: 100
  }
};

function sliderChange(e) {
  var el = e.target;
  filter[state.element][el.name] = el.value;
  update();
};

function toggleAccent() {
  state.accent = !state.accent;
  update();
}

function toggleElement() {
  state.element = input.element.checked ? 'accent' : 'door';
  setSliders();
  update();
}

function setSliders() {
  input.hue.value = filter[state.element].hue;
  input.sat.value = filter[state.element].sat;
  input.lgt.value = filter[state.element].lgt;
}

input.hue.addEventListener('input', sliderChange);
input.sat.addEventListener('input', sliderChange);
input.lgt.addEventListener('input', sliderChange);
input.accent.addEventListener('input', toggleAccent);
input.element.addEventListener('input', toggleElement);

function update() {
  updateElement('door');
  updateElement('accent');

  element.accent.className = state.accent ? '' : 'hidden';
  element.elLabel.innerText = state.element == 'door' ? 'Tür' : 'Akzent';

  storeQuery();
}

function updateElement(el) {
  element[el].style.filter = `
    hue-rotate(${filter[el].hue}deg)
    saturate(${filter[el].sat}%)
    brightness(${filter[el].lgt}%)
  `;
}

function loadQuery() {
  const url = new URL(window.location.href);
  filter.door.hue = url.searchParams.get('door.hue');
  filter.door.sat = url.searchParams.get('door.sat');
  filter.door.lgt = url.searchParams.get('door.lgt');
  filter.accent.hue = url.searchParams.get('accent.hue');
  filter.accent.sat = url.searchParams.get('accent.sat');
  filter.accent.lgt = url.searchParams.get('accent.lgt');
  replaceState(null, '', url.toString());
}

function storeQuery() {
  const url = new URL(window.location.href);
  url.searchParams.set('door.hue', filter.door.hue);
  url.searchParams.set('door.sat', filter.door.sat);
  url.searchParams.set('door.lgt', filter.door.lgt);
  url.searchParams.set('accent.hue', filter.accent.hue);
  url.searchParams.set('accent.sat', filter.accent.sat);
  url.searchParams.set('accent.lgt', filter.accent.lgt);
  replaceState(null, '', url.toString());
}

function panImage() {
  var width = element.imgs.scrollWidth;
  var height = element.imgs.scrollHeight;

  var overX = width - window.innerWidth;
  var overY = height - window.innerHeight;

  element.imgs.style.top = `-${overY / 2}px`;
  element.imgs.style.left = `-${overX / 2}px`;
}

window.onload = function() {
  loadQuery();
  setSliders();
  update();
  panImage();
}
