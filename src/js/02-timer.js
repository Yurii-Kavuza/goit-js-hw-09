import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dataPicker: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timeDelta = 0;
let timerId = null;
let chosenTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const fp = flatpickr('#datetime-picker', options);

refs.start.disabled = true;

function onClose(selectedDates) {
  if (selectedDates[0] <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    refs.start.disabled = true;
    return;
  }
  refs.start.disabled = false;
  chosenTime = selectedDates[0];
  refs.start.addEventListener('click', onStart);
}

function onStart() {
  timerId = setInterval(() => {
    timeDelta = chosenTime - Date.now();
    const leftTime = convertMs(timeDelta);
    renderTime(leftTime);
    disableDataPickerAndButton();

    if (timeDelta <= 0) {
      clearInterval(timerId);
      renderTime(convertMs(0));
      enableDataPickerAndButton();
    }
  }, 1000);
}

function enableDataPickerAndButton() {
  refs.start.disabled = false;
  refs.dataPicker.disabled = false;
}

function disableDataPickerAndButton() {
  refs.start.disabled = true;
  refs.dataPicker.disabled = true;
}

function renderTime(leftTime) {
  Object.entries(leftTime).forEach(([name, value]) => {
    refs[name].textContent = addLeadingZero(value);
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
