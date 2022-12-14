import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const submitBtnEl = document.querySelector('button[type="submit"]');
let userInput = {};

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  submitBtnEl.disabled = true;
  const { delay, step, amount } = event.target.elements;
  userInput.delay = delay.valueAsNumber;
  userInput.step = step.valueAsNumber;
  userInput.amount = amount.valueAsNumber;
  // const {
  //   elements: { delay, step, amount },
  // } = event.target;
  // userInput.delay = Number(delay.value);
  // userInput.step = Number(step.value);
  // userInput.amount = Number(amount.value);

  event.currentTarget.reset();
  console.log(userInput);
  startPromise(userInput.delay, userInput.step, userInput.amount);
}

function startPromise(delay, step, amount) {
  // console.log({ delay, step, amount });
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(onCreatePromiseSuccess)
      .catch(onCreatePromiseError);
    delay += step;
  }
  setTimeout(() => {
    submitBtnEl.disabled = false;
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
        // resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject({ position, delay });
        // reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onCreatePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onCreatePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}

// function onCreatePromiseSuccess(result) {
//   Notiflix.Notify.success(result);
//   console.log(result);
// }

// function onCreatePromiseError(error) {
//   Notiflix.Notify.failure(error);
//   console.log(error);
// }
