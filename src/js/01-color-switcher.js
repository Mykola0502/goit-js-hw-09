const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    console.log(`Interval with id ${timerId} has started!`);
    const bodyColor = getRandomHexColor();

    // bodyEl.style.backgroundColor = bodyColor;
    bodyEl.setAttribute('style', `background-color: ${bodyColor}`);
  }, 1000);

  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(timerId);

  console.log(`Interval with id ${timerId} has stopped!`);

  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
