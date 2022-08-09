
const { response, request } = require('express');

const usuarioGet = (req = request, res = response) => {
  const {nombre = 'No name', q } = req.query;

  res.status(201).json({
    msg:'Get Api - Controller',
    nombre,
    q
  })
}
const usuarioPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg:'Post Api - Controller',
    nombre,
    edad
  })
}
const usuarioPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg:'Put Api - Controller',
    id
  })
}
const usuarioPatch = (req, res = response) => {
  res.json({
    msg:'Patch Api - Controller'
  })
}
const usuarioDelete = (req, res = response) => {
  res.json({
    msg:'Delete Api - Controller'
  })
}

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioPatch,
  usuarioDelete
}