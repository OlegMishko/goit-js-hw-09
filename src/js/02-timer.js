import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', onClickBtn);

const date = new Date();

let timerId;
let selectdDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    allowInput: true,
    onClose(selectedDates) {
        selectdDate = selectedDates[0].getTime();
        if (selectdDate <= date.getTime()) {
            refs.startBtn.setAttribute('disabled', '');
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        if (selectdDate > date.getTime()) {
            refs.startBtn.removeAttribute('disabled');
        }
    },
};

flatpickr(refs.inputEl, options);

function onClickBtn() {
    refs.startBtn.setAttribute('disabled', '');
    refs.inputEl.setAttribute('disabled', '');
    timerId = setInterval(startTheCounter, 1000);
}

function startTheCounter() {
    let nowDate = new Date().getTime();
    let restTime = selectdDate - nowDate;
    let dataDate = convertMs(restTime);
    if (restTime < 999) {
        clearInterval(timerId);
    }
    refs.daysValue.textContent = dataDate.days;
    refs.hoursValue.textContent = dataDate.hours;
    refs.minutesValue.textContent = dataDate.minutes;
    refs.secondsValue.textContent = dataDate.seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}