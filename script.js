// script.js
document.addEventListener('DOMContentLoaded', function () {
    const breakLength = document.getElementById('break-length');
    const sessionLength = document.getElementById('session-length');
    const breakDecrement = document.getElementById('break-decrement');
    const breakIncrement = document.getElementById('break-increment');
    const sessionDecrement = document.getElementById('session-decrement');
    const sessionIncrement = document.getElementById('session-increment');
    const timerLabel = document.getElementById('timer-label');
    const timeLeft = document.getElementById('time-left');
    const startStop = document.getElementById('start_stop');
    const reset = document.getElementById('reset');
    const beep = document.getElementById('beep');

    let isSession = true;
    let isRunning = false;
    let intervalID;
    let minutes = parseInt(sessionLength.textContent);
    let seconds = 0;

    // Functions to handle time format
    function displayTime() {
        timeLeft.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateLabel() {
        timerLabel.textContent = isSession ? 'Session' : 'Break';
    }

    function decrementTime() {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        }
    }

    function toggleTimer() {
        if (isRunning) {
            clearInterval(intervalID);
            isRunning = false;
        } else {
            intervalID = setInterval(updateTimer, 1000);
            isRunning = true;
        }
    }

    function updateTimer() {
        if (minutes === 0 && seconds === 0) {
            beep.play();
            isSession = !isSession;
            minutes = isSession ? parseInt(sessionLength.textContent) : parseInt(breakLength.textContent);
        } else {
            decrementTime();
        }
        displayTime();
        updateLabel();
    }

    // Event listeners for controls
    breakDecrement.addEventListener('click', function () {
        if (parseInt(breakLength.textContent) > 1 && !isRunning) {
            breakLength.textContent = parseInt(breakLength.textContent) - 1;
        }
    });

    breakIncrement.addEventListener('click', function () {
        if (parseInt(breakLength.textContent) < 60 && !isRunning) {
            breakLength.textContent = parseInt(breakLength.textContent) + 1;
        }
    });

    sessionDecrement.addEventListener('click', function () {
        if (parseInt(sessionLength.textContent) > 1 && !isRunning) {
            sessionLength.textContent = parseInt(sessionLength.textContent) - 1;
            if (isSession) {
                minutes = parseInt(sessionLength.textContent);
                displayTime();
            }
        }
    });

    sessionIncrement.addEventListener('click', function () {
        if (parseInt(sessionLength.textContent) < 60 && !isRunning) {
            sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
            if (isSession) {
                minutes = parseInt(sessionLength.textContent);
                displayTime();
            }
        }
    });

    startStop.addEventListener('click', function () {
        toggleTimer();
        startStop.textContent = isRunning ? 'Pause' : 'Start';
    });

    reset.addEventListener('click', function () {
        clearInterval(intervalID);
        isRunning = false;
        isSession = true;
        minutes = parseInt(sessionLength.textContent);
        seconds = 0;
        displayTime();
        updateLabel();
        startStop.textContent = 'Start';
        beep.pause();
        beep.currentTime = 0;
    });

    // Initial setup
    displayTime();
    updateLabel();
});
