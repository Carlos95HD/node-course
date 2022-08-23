const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', validarArchivoSubir, cargarArchivo );

router. put('/:coleccion/:id',[
  validarArchivoSubir,
  check('id', 'No es un id de mongo válido').isMongoId(),
  check('coleccion').custom( e => coleccionesPermitidas(e, [ 'usuarios','productos' ])),
  validarCampos
],actualizarImagenCloudinary );
// ],actualizarImagen );

router.get('/:coleccion/:id', [

], mostrarImagen)

module.exports = router;