
const esAdminRole = ( req, res = response, next ) => {

  //Verificación interna
  if ( !req.usuario) {
    return res.status(500).json({
      message: 'Se quiere verificar el rol sin validar el token primero'
    })
  }

  const { rol, nombre} = req.usuario;

  //Verificar el rol
  if (rol !== 'ADMIN_ROLE') {
    return res.status(500).json({
      msg: `${nombre} no es administrador - No puede hacer esto`
    });
  }

  next()
}

//...roles agrupa en un arreglo todos los roles que vienen en el parametro
const tieneRole = (...roles) => {

  return (req, res = response, next) => {

    if (!roles.includes( req.usuario.rol )) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${ roles }`
      })
    };

    next();
  }

}

module.exports = {
  esAdminRole,
  tieneRole
}