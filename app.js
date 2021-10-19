require ('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
//const { pausa } = require('./helpers/mensajes');


//Por defecto en node se hace todo secuencialmente no estamos en un proceso asincrono que permita utilizar el await,
//por eso creamos un Main asincrono para que dentro del main nos permita trabajar en asincrono.

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { //Si hay tareas guardadas en la base de datos:
        tareas.cargarTareasDelArray( tareasDB )
        
    }
    
        do {
            //Imprimir el menu
            opt = await inquireMenu();
            //opt es igual a la resolucion de la promesa que es el numero elegido por el usuario
            console.log({ opt });

            switch (opt) {
                case '1':
                    //Crear opcion
                    const descripcion = await leerInput('Descripcion: ');
                    tareas.crearTarea(descripcion);
                    break;

                case '2':
                    tareas.listadoCompleto();
                    break;
                
                case '3':   //Listar Completadas
                    tareas.listarPendientesCompletadas(true);
                    break;

                case '4':  //Listar pendientes
                    tareas.listarPendientesCompletadas(false);
                    break;

                case '5': //Completado | Pendiente
                    const ids = await mostrarListadoChecklist(tareas.listadoArray);
                    tareas.cambiarCompletadas( ids );
                    break;

                case '6':  //Borrar
                    const id = await listadoTareasBorrar( tareas.listadoArray );
                    //Await para esperar que la tarea asincrona termine.
                    if (id !== '0') {
                        const sino = await confirmar('¿Estas seguro?');

                        //console.log(sino)   //sino es un bool
                        if (sino) {
                            tareas.borrarTarea(id);
                            console.log('Tarea borrada');
                        }
                    }
                    
                    break;
                  
            }

            guardarDB( tareas.listadoArray);

            await pausa();

         } while( opt !== '0' );


}

main();