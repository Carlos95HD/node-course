const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la Extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida. Validas: ${extensionesValidas}`
      );
    }

    //Generando un nombre de archivo único
    const nombreFinal = uuidv4() + "." + extension;
    //Path (Directorio a guardar el archivo)
    const uploadPath = path.join( __dirname, "../uploads/", carpeta, nombreFinal );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreFinal);
    });
  });
};

module.exports = {
  subirArchivo,
};
