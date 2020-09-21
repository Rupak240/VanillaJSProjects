const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");
const yearEl = document.getElementById("year");

const currentYear = new Date().getFullYear();

// const newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`);
const newYear = `1 Jan ${currentYear + 1}`;

yearEl.innerHTML = `${currentYear + 1}`;

const countdown = () => {
  const newYearsDate = new Date(newYear);
  const currentDate = new Date();

  const totalSeconds = (newYearsDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);

  //   console.log(newYearsDate - currentDate);

  daysEl.innerHTML = formatTime(days);
  hoursEl.innerHTML = formatTime(hours);
  minsEl.innerHTML = formatTime(mins);
  secondsEl.innerHTML = formatTime(seconds);
};

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

// INITIAL CALL
countdown();

setInterval(countdown, 1000);
