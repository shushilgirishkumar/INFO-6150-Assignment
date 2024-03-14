$(document).ready(function() {
  let interval;
  let seconds = 0;

  const getCurrentDateFormatted = () => {
    return new Promise((resolve, reject) => {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substring(0, 10);
        resolve(formattedDate);
      } catch (error) {
        reject('Failed to format the date');
      }
    });
  };

  const updateTime = () => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    $('#time').text(`${hours}:${minutes}:${sec}`);
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

  $('#start').on('click', startStopwatch);
  $('#stop').on('click', stopStopwatch);
  $('#reset').on('click', resetStopwatch);

  const setCurrentDate = async () => {
    try {
      const formattedDate = await getCurrentDateFormatted();
      $('#date-picker').val(formattedDate);
    } catch (error) {
      console.error('Failed to set the current date:', error);
    }
  };

  $('#date-picker').on('keydown', (e) => {
    e.preventDefault();
  });

  $('#date-picker').attr('max', function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    return today;
  });
  

  setCurrentDate();
  updateTime();
});
