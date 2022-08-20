const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async ( req, res = response ) => {
  if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).send({msg:'No hay archivos que subir'});
    return;
  }

  //Subir Imagenes
  // const nombre = await subirArchivo( req.files );
  // res.json({ nombre });

  try {
    // Subir Archivos + carpeta
    // const nombre = await subirArchivo( req.files, ['txt', 'md'], "textos");
    // res.json({ nombre });

    const nombre = await subirArchivo( req.files, undefined, "imgs");
    res.json({ nombre });

  } catch (msg) {
    res.status(400).send({msg: msg});
  }
}

module.exports = {
  cargarArchivo
}