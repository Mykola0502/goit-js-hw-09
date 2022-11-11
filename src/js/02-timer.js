import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

/**
 *         Варіант з Класом
 */

const { startBtn, timerDays, timerHours, timerMinutes, timerSeconds } = {
  startBtn: document.querySelector('[data-start'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

let finishTime = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    changeDate(selectedDates);
  },
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    if (isActive) {
      Notiflix.Notify.warning('The timer is running. Cannot restart');
      return;
    }
    isActive = true;
    Notiflix.Notify.info('Time is running out');
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = finishTime.getTime() - startTime;
      const time = this.convertMs(deltaTime);

      if (deltaTime >= 0) {
        this.onTick(time);
        console.log(time);
        // console.log(isActive);
        return;
      }
      clearInterval(this.intervalId);
      isActive = false;
      deactivatedStartBtn();
      Notiflix.Notify.success('Time is up');
      console.log('Interval was stopped');
      //   console.log(isActive);
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
}

startBtn.addEventListener('click', () => {
  timer.start();
  //   deactivatedStartBtn();
});

flatpickr('#datetime-picker', options);
deactivatedStartBtn();

function deactivatedStartBtn() {
  startBtn.setAttribute('disabled', true);
}

function changeDate(selectedDates) {
  if (!isActive) {
    finishTime = selectedDates[0];
    console.log(finishTime);
    if (finishTime < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');
  } else {
    return;
  }
}

const timer = new Timer({
  onTick: updateTimer,
});

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
  timerSeconds.textContent = `${seconds}`;
}

/**
 * Варіант без Класу
 */

// const { startBtn, timerDays, timerHours, timerMinutes, timerSeconds } = {
//   startBtn: document.querySelector('[data-start'),
//   timerDays: document.querySelector('[data-days]'),
//   timerHours: document.querySelector('[data-hours]'),
//   timerMinutes: document.querySelector('[data-minutes]'),
//   timerSeconds: document.querySelector('[data-seconds]'),
// };

// let finishTime = null;
// let isActive = false;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     changeDate(selectedDates);
//   },
// };

// startBtn.addEventListener('click', () => {
//   timer.start();
//   //   deactivatedStartBtn();
// });

// flatpickr('#datetime-picker', options);
// deactivatedStartBtn();

// function deactivatedStartBtn() {
//   startBtn.setAttribute('disabled', true);
// }

// function changeDate(selectedDates) {
//   if (!isActive) {
//     finishTime = selectedDates[0];
//     console.log(finishTime);
//     if (finishTime < Date.now()) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//       // window.alert('Please choose a date in the future');
//       return;
//     }
//     startBtn.removeAttribute('disabled');
//   } else {
//     return;
//   }
// }

// const timer = {
//   intervalId: null,
//   //   isActive: false,
//   start() {
//     if (isActive) {
//       Notiflix.Notify.warning('The timer is running. Cannot restart');
//       return;
//     }
//     isActive = true;
//     Notiflix.Notify.info('Time is running out');
//     this.intervalId = setInterval(() => {
//       const startTime = Date.now();
//       const deltaTime = finishTime.getTime() - startTime;
//       const time = convertMs(deltaTime);

//       if (deltaTime >= 0) {
//         // Notiflix.Notify.info('Time is running out');
//         updateTimer(time);
//         console.log(time);
//         console.log(isActive);
//         return;
//       }
//       clearInterval(this.intervalId);
//       Notiflix.Notify.success('Time is up');
//       isActive = false;
//       deactivatedStartBtn();
//       console.log(isActive);
//       console.log('Interval was stopped');
//     }, 1000);
//   },
// };

// function updateTimer({ days, hours, minutes, seconds }) {
//   timerDays.textContent = `${days}`;
//   timerHours.textContent = `${hours}`;
//   timerMinutes.textContent = `${minutes}`;
//   timerSeconds.textContent = `${seconds}`;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }
