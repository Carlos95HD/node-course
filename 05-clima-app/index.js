require("dotenv").config();

const {
  pausa,
  inquirerMenu,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("colors");

const main = async () => {
  const busquedas = new Busquedas();

  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad");

        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        const lugarSel = lugares.find((lugar) => lugar.id === id);
        const { nombre, lat, lng } = lugarSel;

        //Guardar en db
        busquedas.agregarHistorial(nombre);

        //Datos del clima
        const clima = await busquedas.climaLugar(lat, lng);
        const { desc, min, max, temp } = clima;

        //Mostrar Resultados
        console.clear();
        console.log("\ninformación de la ciudad\n".green);
        console.log("Ciudad:", nombre.green);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura ", temp);
        console.log("Mínima: ", min);
        console.log("Máxima: ", max);
        console.log("Como esta: ", desc.green);
        break;

      case 2:
        busquedas.getHistorialCapitalizado().forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });

        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
