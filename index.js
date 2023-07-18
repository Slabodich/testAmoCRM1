const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Функция для форматирования времени в "hh:mm:ss"
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let intervalId = 0;

  return (seconds) => {
    let remainingSeconds = seconds;

    timerEl.textContent = formatTime(remainingSeconds);
    timerEl.style.color = 'black';

    clearInterval(intervalId);

    intervalId = setInterval(() => {
      remainingSeconds -= 1;
      timerEl.textContent = formatTime(remainingSeconds);

      if (remainingSeconds <= 10) {
        timerEl.style.color = 'red';
      }

      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        timerEl.textContent = "Time's up!";
        timerEl.style.color = 'black';
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, ''); // Оставить только числа
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
