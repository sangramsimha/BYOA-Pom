let time = 25 * 60;
let timerInterval = null;
let isWorkSession = true;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const sessionLabel = document.getElementById('session-label');
const progressBar = document.getElementById('progress');

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const totalTime = isWorkSession ? WORK_TIME : BREAK_TIME;
    const progressPercent = ((totalTime - time) / totalTime) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert(isWorkSession ? 'Work session completed!' : 'Break time over!');
            isWorkSession = !isWorkSession;
            time = isWorkSession ? WORK_TIME : BREAK_TIME;
            sessionLabel.textContent = isWorkSession ? 'Work Session' : 'Break Session';
            updateDisplay();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isWorkSession = true;
    time = WORK_TIME;
    sessionLabel.textContent = 'Work Session';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay(); 