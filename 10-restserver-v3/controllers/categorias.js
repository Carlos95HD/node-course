const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async ( req, res = response ) => {
  const query = { estado: true }
  const { desde = 0 , limite = 5 } = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(desde)
      .limit(limite)
    ]);

    res.status(201).json({
      total,
      categorias
    });
}

// obtenerCategoria - populate {}
const obtenerCategoria = async ( req, res = response ) => {
  const id = req.params.id;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.status(201).json({
    categoria
  });
}

const crearCategoria = async ( req, res= response ) => {

  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre })

  if ( categoriaDB ) {
    return res.status( 400 ).json({
      msg:`Categoria ${ categoriaDB.nombre } ya existe`
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = new Categoria(data);

  //Guardar en DB
  await categoria.save();

  res.status(201).json(categoria);

}

//actualizarCategoria
const actualizarCategoria = async ( req, res = response ) => {
  const id = req.params.id;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id // Actualiza datos del usuario que lo modifica

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre');
  res.json( categoria );
};

//borrarCategoria - estado:false
const borrarCategoria = async ( req, res = response ) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate( id, {estado : false}, { new: true } );
  res.json( categoria );
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}