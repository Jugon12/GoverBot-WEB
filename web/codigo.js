function pruebaDesdeWeb() {
    console.log("pito")
    fetch('http://localhost:3000/llamar-funcion')
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error:', error));
    console.log("poto")
}