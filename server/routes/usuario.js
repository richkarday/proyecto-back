const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verToken } = require('../middleware/autenticacion');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', (req, res) => {
    Usuario.find()
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        foto: body.foto,
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.put('/usuario', [verToken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'nombre', 'telefono', 'foto', 'rol']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.delete('/usuario', (req, res) => {
    let id = req.body.id;

    Usuario.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Usuario no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

})

module.exports = app;