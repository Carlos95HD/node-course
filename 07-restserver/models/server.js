const express = require('express')
const cors = require('cors')

class Server{
  constructor(){
    this.app = express();
    this.port = process.env.PORT
    this.usuarioPath = '/api/usuarios'

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  middlewares(){
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use( express.json() );

    //Directorio Publico
    this.app.use(express.static( 'public'));
  }

  routes(){
    this.app.use( this.usuarioPath, require('../routes/usuarios'));
  }

  listen(){
    this.app.listen( this.port,() => {
      console.log('Server listening on port ' + this.port);
    })
  }
}

module.exports = Server;