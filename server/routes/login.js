const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email}, (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '*Usuario y/o contraseña incorrectas'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o *contraseña incorrectas'
                }
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB 
        }, process.env.SEED, { expiresIn: process.env.EXPTIME });     

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});

module.exports = app;