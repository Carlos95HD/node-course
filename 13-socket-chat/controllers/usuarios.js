
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioGet = async(req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true } //Estado verifica si el usuario fue eliminado

  //Ejecuta find() mientras que countDocuments() está a la espera de que finalice la promesa find()
  // const usuarios = await Usuario.find(query)
  // .skip(desde)
  // .limit(limite)
  // const total = await Usuario.countDocuments(query);

  //Al utilizar Promise.all() ejecuta las dos promesas al mismo tiempo
  const [ total , usuarios ] = await Promise.all([
    Usuario.countDocuments(query), // total
    Usuario.find(query)
    .skip(desde)
    .limit(limite)// usuarios
  ]);

  res.status(201).json({
    total,
    usuarios
  })
}

const usuarioPost = async(req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync( password, salt );

  //Guardar en DB
  await usuario.save();

  res.json({
    usuario
  })
}

const usuarioPut = async(req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar en base de datos
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt );
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json( usuario )
}

const usuarioPatch = (req, res = response) => {
  res.json({
    msg:'Patch Api - Controller'
  })
}

const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  //Eliminar fisicamente (No recomendado);
  // const usuario = await Usuario.findByIdAndDelete( id );

  //Eliminar manteniendo datos en base de datos(Recomendado)
  const usuario = await Usuario.findByIdAndUpdate( id, {estado : false} );

  res.json( usuario )
}

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioPatch,
  usuarioDelete
}