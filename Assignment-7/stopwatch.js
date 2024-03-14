let interval;
let seconds = 0;

const getCurrentDateFormatted = () => new Promise((resolve, reject) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);
    resolve(formattedDate);
  } catch (error) {
    reject('Failed to format the date');
  }
});

const updateTime = () => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  document.getElementById('time').textContent = `${hours}:${minutes}:${sec}`;
};

const startStopwatch = () => {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      updateTime();
    }, 1000);
  }
};

const stopStopwatch = () => {
  clearInterval(interval);
  interval = null;
};

const resetStopwatch = () => {
  stopStopwatch();
  seconds = 0;
  updateTime();
};

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('stop').addEventListener('click', stopStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);

const setCurrentDate = async () => {
  try {
    const formattedDate = await getCurrentDateFormatted();
    document.getElementById('date-picker').value = formattedDate; 
  } catch (error) {
    console.error('Failed to set the current date:', error);
  }
};

document.getElementById('date-picker').addEventListener('keydown', (e) => {
   e.preventDefault();
});

setCurrentDate();
