fetch('http://localhost:1500/api/session', {
  method: 'GET',
  credentials: 'include' // Incluye las cookies en la solicitud
})
.then(response => {
  if (!response.ok) {
    window.location.href = 'http://localhost:5500'
    throw new Error('Error al obtener la sesión del usuario');  }
  return response.json();
})
.then(data => {
  console.log(data)
  if (data){

    console.log('Sesión del usuario:', data);
    setTimeout(() => {
      fetch('http://localhost:1500/api/session/end', {
        method: 'GET',
        credentials: 'include'
      })
      window.location.href = 'http://localhost:5500'
    }, 3600*1000);

  } else {
    window.location.href = 'http://localhost:5500'
  }

})
.catch(error => {
  console.error('Error:', error);
});




