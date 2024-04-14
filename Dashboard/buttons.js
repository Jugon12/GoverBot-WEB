function sendMessageButton() {
    fetch('http://localhost:3000/send-message')
        .then(response => response.text())
        .catch(error => console.error('Error:', error));
}
  
function sendChannelButton() {
    fetch('http://localhost:3000/send-channel')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error at sending content');
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    const timerDisplay = document.getElementById('timer');
    let timeLeft = 3600; // 1 hora en segundos
  
    const timerInterval = setInterval(() => {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;
  
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      timerDisplay.textContent = formattedTime;
  
      timeLeft--;
  
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00:00';
        // Aquí puedes añadir alguna acción que desees realizar cuando el contador llegue a cero
      }
    }, 1000);
});