const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

refs.stop.disabled = true;

function onStart(evt) {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  evt.target.disabled = true;
  refs.stop.disabled = false;
}

function onStop(evt) {
  clearInterval(timerId);
  evt.target.disabled = true;
  refs.start.disabled = false;
}
