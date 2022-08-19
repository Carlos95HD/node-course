const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
  const existeRole = await Role.findOne({ rol });
  if ( !existeRole ) {
    throw new Error(`El rol ${ rol } no está registrado en la DB`);
  }
}

const emailExiste = async( correo = '' ) => {
  const existeEmail = await Usuario.findOne( {correo} );
  if ( existeEmail ) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
}

// Validador de usuarios
const existeUsuarioPorId = async(id) => {
  const existeUsuario = await Usuario.findById( id );
  if ( !existeUsuario ) {
    throw new Error(`El id no existe ${id}`);
  }
}

// Validador de categorias
const existeCategoriaPorId = async(id) => {
  const existeCategoria = await Categoria.findById( id );
  if ( !existeCategoria ) {
    throw new Error(`El id de la categoria no existe ${id}`);
  }
}

// Validador de productos
const existeProductoPorId = async(id) => {
  const existeProducto = await Producto.findById( id );
  if ( !existeProducto ) {
    throw new Error(`El id de la categoria no existe ${id}`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId
} 