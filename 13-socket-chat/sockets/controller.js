const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketContoller = async ( socket = new Socket(), io ) => {
  const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
  // console.log(usuario)
  if ( !usuario ) {
    return socket.disconnect();
  }

  //Agregar al usuario conectado
  chatMensajes.conectarUsuario( usuario );
  io.emit( 'usuarios-activos', chatMensajes.usuariosArr );
  io.emit('recibir-mensajes', chatMensajes.ultimos10 );

  //Conectarlo a una sala especial
  //3er sala conectada( usuario.id ) / Otras salas global, socket.id
  socket.join( usuario.id );

  //Limpiar cuando alguien se desconecta
  socket.on('disconnect', () => {
    chatMensajes.desconectarUsuario( usuario.id );
    io.emit( 'usuarios-activos', chatMensajes.usuariosArr );
  });

  socket.on('enviar-mensaje', ({ mensaje, uid }) => {
    if ( uid ) {
      //mensaje privado
      socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje });
    } else {
      chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje );
      io.emit('recibir-mensajes', chatMensajes.ultimos10 );
    }
  });
}

module.exports = {
  socketContoller,
};