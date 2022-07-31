const fs = require('fs');
const colors = require('colors')


const crearArchivo = async( base = 5, listar, limite = 10) => {
  try {
    let salida = '';
    let consola = '';

    for (let i = 1; i <= limite ; i++) {
      salida += `${ base } x ${ i } = ${ base * i } \n`
      consola += `${ base } x ${ i } = ${ base * i } \n`.bgMagenta
    }

    if (listar) {
      console.log('================================'.cyan)
      console.log('        Tabla de', colors.green(base) );
      console.log('================================'.cyan)
      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${ base }.txt`, salida)

    return `tabla-${ base }.txt`.yellow

  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearArchivo
}