const { inquirerMenu, pausa } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  let opt = "";

  do {
    opt = await inquirerMenu();
    console.log({ opt });
    
    await pausa();

  } while (opt !== "0");
};

main();
