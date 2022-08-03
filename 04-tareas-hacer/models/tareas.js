const { green } = require('colors');
const Tarea = require ('./tarea');
require("colors");
/*
  _listado: {
    'uuid-213123-123123-2: { id:12, desc:asdas, completadoEn: 2012}
  }
*/
class Tareas {
  _listado = {};

  get listadoArr(){
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {}
  };

  borrarTarea ( id = '' ) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray ( tareas = [] ){
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  };

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${ i + 1 }`.green
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'Completada'.green
        : 'Pendiente'.red

      console.log(`${ idx } ${ desc } :: ${ estado }`);
    })
  }

  crearTareas( desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  ListarPendientesCompletadas( completadas = true) {

    let contador = 0;
    this.listadoArr.forEach( tarea => {
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
      ? 'Completada'.green
      : 'Pendiente'.red

      if ( completadas ) {
        contador += 1;
        completadoEn && console.log(`${( contador + '.').green } ${ desc } :: ${ completadoEn.green }`)
      } else {
        if (!completadoEn){
          contador += 1;
          console.log(`${( contador + '.').green } ${ desc } :: ${ estado }`)
        }
      }
    })
  }

  toggleCompletadas( ids = [] ){
    ids.forEach( id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    })

    this.listadoArr.forEach( tarea => {
      if ( !ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

}

module.exports = Tareas;