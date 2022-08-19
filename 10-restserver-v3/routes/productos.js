const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//Crear productos - privado - con token
router.post('/', [
  validarJWT,
  check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
  check('categoria', 'El campo categoria es obligatorio').not().isEmpty(),
  check('categoria', 'No es un ID de mongo válido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos,
], crearProducto );

//Obtener todas las producto - publico
router.get('/', obtenerProductos);

//Obtener producto por id
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos,
], obtenerProductos );


//Actualizar - privado - cualquier persona con un token válido
router.put('/:id', [
  validarJWT,
  // check('categoria', 'No es un ID de mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos,
], actualizarProducto );

//Borrar una producto- Admin
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'No es un ID de mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], borrarProducto);


module.exports = router;