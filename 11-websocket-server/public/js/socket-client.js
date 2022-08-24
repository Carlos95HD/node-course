//Referencia del HTML
const lbOnline = document.querySelector('#lbOnline');
const lbOffline = document.querySelector('#lbOffline');
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io();

socket.on('connect', () => {
  // console.log('Connected to the server');

  lbOffline.style.display = 'none';
  lbOnline.style.display = '';
});

socket.on('disconnect', () => {
  // console.log('Disconnected from the server');

  lbOnline.style.display = 'none';
  lbOffline.style.display = '';
});


socket.on('enviar-mensaje', ( payload ) => {
  console.log( payload )
})

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: '1312313',
    fecha: new Date().getTime(),
  };

  //Enviar mensaje al Servidor
  socket.emit('enviar-mensaje', payload, (id) => {
    console.log('Desde el server', id);
  });
})