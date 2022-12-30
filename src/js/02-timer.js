import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  inputDays: document.querySelector('.field [data-days]'),
  inputHours: document.querySelector('.field [data-hours]'),
  inputMinutes: document.querySelector('.field [data-minutes]'),
  inputSeconds: document.querySelector('.field [data-seconds]'),
};

let timerId = null;

refs.startButton.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startButton.removeAttribute('disabled');

    const showTimer = () => {
      const nowDate = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const difference = selectData - nowDate;
      const { days, hours, minutes, seconds } = convertMs(difference);
      refs.inputDays.textContent = addLeadingZero(days);
      refs.inputHours.textContent = addLeadingZero(hours);
      refs.inputMinutes.textContent = addLeadingZero(minutes);
      refs.inputSeconds.textContent = addLeadingZero(seconds);

      if (
        refs.inputDays.textContent === '00' &&
        refs.inputHours.textContent === '00' &&
        refs.inputMinutes.textContent === '00' &&
        refs.inputSeconds.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    refs.startButton.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });
