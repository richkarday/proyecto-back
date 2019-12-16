const express = require('express');
const _ = require('underscore');
const Prestamo = require('../models/prestamo');
const { verToken } = require('../middleware/autenticacion');
const app = express();

app.get('/prestamo',  (req, res) => {
    Prestamo.find()
    .exec((err, prestamos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            count: prestamos.length,
            prestamos
        });
    });
});

app.post('/prestamo',  (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo ({
        usuario: body.usuario,
        fechasalida: body.fechasalida,
        fechaentrega: body.fechaentrega,
        libro: body.libro,
        fotousr: body.fotousr,
        fotolib: body.fotolib
    });

    prestamo.save((err, presDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.put('/prestamo', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['usuario', 'fechasalida', 'fechaentrega', 'libro', 'fotousr', 'fotolib']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, presDB) =>{
        if(err) { 
            return res.status(400).json({
                ok: false,
                err
            });
        }
            return res.status(200).json({
                ok: true,
                presDB
        });
    });
});

module.exports = app;