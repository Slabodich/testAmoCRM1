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
  let startTime = 0;
  let animationFrameId = 0;

  return (seconds) => {
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsedTime = timestamp - startTime;
      const remainingSeconds = Math.max(seconds - Math.floor(elapsedTime / 1000), 0);

      timerEl.textContent = formatTime(remainingSeconds);

      if (remainingSeconds <= 10) {
        timerEl.style.color = 'red';
      } else {
        timerEl.style.color = 'black';
      }

      if (remainingSeconds > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        timerEl.textContent = "Time's up!";
        timerEl.style.color = 'black';
      }
    };

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(animate);
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
