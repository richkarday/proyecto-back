const mongoose = require('mongoose');
const Libro = require('./libro');
const Usuario = require('./usuario');

let Schema =  mongoose.Schema;

let PrestamoSchema = new Schema ({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingrese el usuario']
    },
    fechasalida: {
        type: String,
        required: [true, 'Ingrese fecha salida']
    },
    fechaentrega: {
        type: String,
        required: [true, 'Ingresa fecha de entrega']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Ingrese el libro']
    },
    fotousr: {
        type: String,
    },
    fotolib: {
        type: String,
        
    }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);