function sendMessageButton() {
    fetch('http://localhost:3000/send-message')
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error:', error));
}
  
function sendChannelButton() {
    fetch('http://localhost:3000/send-channel')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar contenido');
        }
        console.log('Contenido enviado correctamente');
    })
    .catch(error => console.error('Error:', error));
}