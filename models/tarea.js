const { v4: uudiv4 } = require('uuid');
//{ } Desestructuracion.Nos quedamos con la propiedad v4 del objeto y le cambiamos el nombre.

class Tarea {

    id = '';
    descripcion = '';
    completadoEn = null; //Si es null no esta completado, si no es la fecha en la que se ha completado.

    constructor(desc){
        this.id = uudiv4();
        this.descripcion = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
//no se usan llaves porque si no habria que desestructurar e importarlo. Con llaves es un objeto CREO.