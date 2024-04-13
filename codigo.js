function pruebaDesdeWeb() {
    console.log("pito")
    fetch('http://localhost:3000/enviar-mensaje')
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error:', error));
    console.log("poto")
}
function pruebaDesdeWeb2() {
    console.log("pito2")
    
    // const contenido = document.getElementById('contenidoTextarea').value;
    const contenido = "Mensaje de prueba sacado de la web";
    fetch('http://localhost:3000/enviar-contenido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contenido: contenido })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar contenido');
        }
        console.log('Contenido enviado correctamente');
    })
    .catch(error => console.error('Error:', error));
    
    console.log("poto2")
}