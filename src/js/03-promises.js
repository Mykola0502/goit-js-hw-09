import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
let userInput = {};

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;
  userInput.delay = Number(delay.value);
  userInput.step = Number(step.value);
  userInput.amount = Number(amount.value);

  event.currentTarget.reset();
  console.log(userInput);
  startPromise(userInput.delay, userInput.step, userInput.amount);
}

function startPromise(delay, step, amount) {
  console.log({ delay, step, amount });
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(onCreatePromiseSuccess)
      .catch(onCreatePromiseError);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    const passed = Math.random() > 0.5;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onCreatePromiseSuccess(result) {
  Notiflix.Notify.success(result);
  console.log(result);
}

function onCreatePromiseError(error) {
  Notiflix.Notify.failure(error);
  console.log(error);
}
