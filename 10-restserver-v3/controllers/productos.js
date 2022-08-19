const { response } = require("express");
const { Promise } = require("mongoose");
const { Producto, Categoria } = require("../models");


const obtenerProductos = async( req, res = response) => {
  const query = { estado: true }
  const { desde = 0 , limite = 5 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(desde)
      .limit(limite)
    ]);

    res.status(201).json({
      total,
      productos
    });
}

const obtenerProducto = async( req, res = response) => {
  const id = req.params.id;
  const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')

  res.status(201).json({
    producto
  });
};

const crearProducto = async ( req, res = response) => {
  // const { nombre, estado, precio, categoria , descripcion = '', disponible = true  } = req.body
  const { estado, usuario, ...body } = req.body;
  // console.log(req.body)

  const productoDB = await Producto.findOne({ nombre: body.nombre });
  // const [ productoDB, categoriaDB ] = await Promise.all([
    // Producto.findOne({ nombre }),
    // Categoria.findById( categoria )
  // ]);

  if ( productoDB ) {
    return res.status( 400 ).json({
      msg:`Producto ${ nombre } ya existe`
    });
  }

  //Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
  }

  const producto = new Producto(data);

  // Guardar en DB
  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async ( req, res = response) => {
  const id = req.params.id;
  const { usuario, ...data } = req.body;

  //Si el nombre viene - actualizar datos
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  // Actualiza datos del usuario que lo modifica
  data.usuario = req.usuario._id

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre');
  res.json( producto );
};

const borrarProducto = async ( req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate( id, {estado : false}, { new: true } );

  res.json( productoBorrado );
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
};