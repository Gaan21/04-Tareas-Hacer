const fs = require('fs');

const archivo = './database/data.json'; //json en lugar de txt para mejor vista

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify(data) );//Crea un json que pasa a string 
    //lo que hay en el Array data.
}

const leerDB  = ( ) => {

    if ( !fs.existsSync(archivo) ) { //Si no existe return null.
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'}); //utf Para que sea legible
    const data = JSON.parse( info );//CREO que no es necesario.

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}