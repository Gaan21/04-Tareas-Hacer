//const { rejects } = require('assert');
//const { resolve } = require('path');
//const { reject } = require('promise');
//const { resolve } = require('promise');

//var Promise = require('promise');

require ('colors');

const mostrarMenu = () => {

     return new Promise ( resolve => {

        console.clear()
        console.log('========================='.green)
        console.log('  Seleccione una opcion'.green)
        console.log('=========================\n'.green)
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);
    
        //Para poder leer linea en consola
        const readLine = require ('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Selecciona una opcion: ', (option) => {
            //console.log( option );
            readLine.close();

            resolve (option);
            
           
        })
        
    });
    
}

const pausa = () =>{

    return new Promise( resolve => {

        const readLine = require ('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, (option) => {
            readLine.close();

            resolve();
            
            
        })

    });

   
}

module.exports = {
mostrarMenu,
pausa
}