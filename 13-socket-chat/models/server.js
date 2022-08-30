const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileUpload');
const { createServer } = require('http')

const { dbConection } = require('../database/config');
const { socketContoller } = require('../sockets/controller');

class Server{
  constructor(){
    this.app = express();
    this.port = process.env.PORT
    this.server = createServer( this.app );
    this.io = require('socket.io')(this.server);

    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      uploads: '/api/uploads',
    }

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  async conectarDB(){
    await dbConection();
  };

  middlewares(){
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use( express.json() );

    //Directorio Publico
    this.app.use(express.static( 'public'));

    // FileUpload - Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true //Crea el directorio de archivos subidos si no existe
  }));
  }

  routes(){
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.buscar, require('../routes/buscar'));
    this.app.use( this.paths.categorias, require('../routes/categorias'));
    this.app.use( this.paths.productos, require('../routes/productos'));
    this.app.use( this.paths.usuarios, require('../routes/usuarios'));
    this.app.use( this.paths.uploads, require('../routes/uploads'));
  }

  listen(){
    this.server.listen( this.port,() => {
      console.log('Server listening on port ' + this.port);
    })
  }

  sockets(){
    this.io.on("connection", ( socket ) =>  socketContoller( socket, this.io) );
  }
}

module.exports = Server;