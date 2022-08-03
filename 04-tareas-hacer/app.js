const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirm, mostrarListadoCheckList } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    //Establecer las tareas
    //Cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  // await pausa();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTareas(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.ListarPendientesCompletadas(true);
        break;

      case "4":
        tareas.ListarPendientesCompletadas(false);
        break;

      case "5":
        const ids = await mostrarListadoCheckList( tareas.listadoArr ) ;
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar( tareas.listadoArr );
        if ( id !== '0' ) {
          const ok = await confirm('¿Está seguro?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
