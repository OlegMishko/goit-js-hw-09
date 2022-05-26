const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtn);

refs.stopBtn.addEventListener('click', onStoptBtn);

function onStartBtn() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    console.log(refs.startBtn);
    refs.startBtn.disabled = true;
};

function onStoptBtn() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};