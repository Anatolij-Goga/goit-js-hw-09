import '../css/common.css';

const bodyElement = document.querySelector('body');
const randomColorStartButton = document.querySelector('button[data-start]');
const randomColorStopButton = document.querySelector('button[data-stop]');
const COLOR_CHANGE_DELAY = 1000;
let timerId = null;
randomColorStopButton.disabled = true;

randomColorStartButton.addEventListener('click', runRandomColor);
randomColorStopButton.addEventListener('click', stopRandomColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function backgroundColorChange() {
  bodyElement.style.backgroundColor = getRandomHexColor();
}

function runRandomColor() {
  randomColorStartButton.disabled = true;
  randomColorStopButton.disabled = false;
  timerId = setInterval(backgroundColorChange, COLOR_CHANGE_DELAY);
}

function stopRandomColor() {
  randomColorStartButton.disabled = false;
  randomColorStopButton.disabled = true;
  clearInterval(timerId);
}
