import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  buttonStartElement: document.querySelector('button[data-start]'),
  inputDays: document.querySelector('.field [data-days]'),
  inputHours: document.querySelector('.field [data-hours]'),
  inputMinutes: document.querySelector('.field [data-minutes]'),
  inputSeconds: document.querySelector('.field [data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
