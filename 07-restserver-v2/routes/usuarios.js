const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioPost,
        usuarioPut,
        usuarioDelete,
        usuarioPatch,
        usuarioGet } = require('../controllers/usuarios');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet);

router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password tiene que ser mas de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom( emailExiste ),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRoleValido ),
  validarCampos
], usuarioPost);

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( esRoleValido ),// El rol puede ser requerido o no (es opcional).
  validarCampos
], usuarioPut);

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;