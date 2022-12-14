const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if ( !usuario ) {
      return res.status(400).jsonp({
        msg: " Usuario / Password incorrect - correo"
      })
    }

    //Si el usuario está activo
    if ( !usuario.estado ) {
      return res.status(400).jsonp({
        msg: " Usuario / Password incorrect - estado: false"
      })
    }

    //Verificar la contraseña
    //Comparar contraseña recibida con la de base de datos
    const validPassword = bcrypt.compareSync( password, usuario.password );
    if ( !validPassword ) {
      return res.status(400).jsonp({
        msg: " Usuario / Password incorrect - password"
      })
    }

    //Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg:'Hable con el administrador'})
  }
};

const googleSignin = async(req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify( id_token);

    let usuario= await Usuario.findOne({ correo });

    if (!usuario) {
      //Usuario no existe tengo que crearlo
      const data = {
        nombre,
        correo,
        password: 'none',
        img,
        google: true
      };

      usuario = new Usuario( data );
      await usuario.save();
    }

    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    //Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    })
    
  } catch (error) {
    res.status(400).json({ 
      msg: 'token de google no es valido'
    });
  }
}

const renovarToken = async ( req, res = response ) => {
  const { usuario } = req;

  //Generar el JWT
  const token = await generarJWT( usuario.id );

  res.json({
    usuario,
    token
  })
};

module.exports = {
  login,
  googleSignin,
  renovarToken
}