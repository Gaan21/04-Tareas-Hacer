const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArray() {

        const listado = [];//Creacion de Array

        Object.keys(this._listado).forEach( key => {
//Funcion de javascript: Object.keys() que extrae todas las llaves del objeto y crea un Array
//Las llaves son el id unico creado con uuid.//DUDA: QUE ES UNA KEY Y COMO LO SABE JAVASCRIPT.

            const tarea = this._listado[key]; //Cada key extraida la añadimos al Array.

            listado.push( tarea ); //Llenar Array.
        })

        return listado;
    }


    constructor() {
        this._listado = {};
    }


    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }


    cargarTareasDelArray( tareasArr = [] ){

        tareasArr.forEach( tarea1 => {
            this._listado[tarea1.id] = tarea1;
        });
        //ME CUESTA COMPRENDER LA LOGICA DE LA POO CUANDO ES ALGO REBUSCADA.
        //Sale en el programa el id y la descripcion de la tarea.
        
    }


    crearTarea(descripcion){
        const tarea = new Tarea(descripcion);
        
        this._listado[tarea.id] = tarea;
        //En el listado se crea la propiedad id y se almacena lo que hay en el
        //id de la clase Tarea que se ha creado con uuid
    }


    listadoCompleto( ) {

        console.log();
        this.listadoArray.forEach( (tarea, index ) => {

            const { descripcion, completadoEn } = tarea;  //Desestructuracion de objeto.
            //const desc = tarea.descripcion; //forma alternativa
            
            const ind = `${index + 1}`.green;

            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
  
            console.log(`${ind} ${descripcion} :: ${estado}`);

        })  
    }


    listarPendientesCompletadas( completado = true ){
       
        console.log();
        let contador = 0;

        this.listadoArray.forEach( tarea => {

            const { descripcion, completadoEn } = tarea;  //Desestructuracion de objeto.
            //const desc = tarea.descripcion; //forma alternativa

            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            if ( completado ) {
                // mostrar completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${contador.toString().green}${'.'.green} ${descripcion} :: ${completadoEn.green}`);
                }
                
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${contador.toString().red}${'.'.red} ${descripcion} :: ${estado}`)  
                }
            }
        });  
    }

    cambiarCompletadas ( ids = []){

        ids.forEach( id => {
            const tarea = this._listado[id];

            if ( !tarea.completadoEn ){
                    tarea.completadoEn = new Date().toISOString();
                //Si no existe la tarea completada creamos una nueva fecha.
            }
        });

        this.listadoArray.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;  
                
            }
        })
    }
}

module.exports = Tareas;