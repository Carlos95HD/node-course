const argv = require('yargs')
  .option('b',{
    alias:'base',
    type:'number',
    demandOptions: true,
    describe: 'Es la base de multiplicar'
  })
  .option('l',{
    alias:'listar',
    type:'boolean',
    default:false,
    describe: 'Muestra la tabla en la consola'
  })
  .option('h',{
    alias:'hasta',
    type:'number',
    default: 10,
    describe: 'Limite de la multiplicación'
  })
  .check((argv, options) => {
    if(isNaN(argv.b)){
      throw 'La base tiene que ser un numero'
    }
    if(isNaN(argv.h)){
      throw 'El limite tiene que ser un numero'
    }

    return true;
  })
  .argv;

module.exports = argv;