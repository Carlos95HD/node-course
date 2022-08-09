const { Router } = require('express');
const { usuarioPost,
        usuarioPut,
        usuarioDelete,
        usuarioPatch,
        usuarioGet } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;