const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/imagen/:ruta/:foto', (req, res) => {
    let ruta = req.params.ruta;
    let foto = req.params.foto;
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${foto}`);
    let noimage = path.resolve(__dirname, `../assets/noimage.jpg`);

    if (fs.existsSync(rutaImagen)) {
        return res.sendFile(rutaImagen);
    } else {
        return res.sendFile(noimage);
    }
});

module.exports = app;