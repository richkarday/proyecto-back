const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese su nombre porfavor']
    },
    password: {
        type: String,
        required: [true, 'Porfavor ingresa la contraseña']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Ingrese su email']
    },
    telefono: {
        type: Number,
    },
    foto:{
        type: String,
    },
    rol: {
        type: String,
        default: 'USER_ROL'
    }
});

usuarioSchema.plugin(uniquevalidator,{
    message: '{PATH} Debe que ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema);