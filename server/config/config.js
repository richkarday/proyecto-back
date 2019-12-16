// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//CONEXIÓN A BASE DE DATOS  
let urlDB;

if (process.env.NODE_ENV === 'dev') {
urlDB = 'mongodb://localhost:27017/biblioteca';
} else {
urlDB = 'mongodb+srv://Admin:socom45678americanarmy@cluster0-naezp.mongodb.net/biblioteca';
}

process.env.URLDB = urlDB;

//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'esta-es-nuestra-firma';

//EXPIRE TIME JWT 
process.env.EXPTIME = process.env.EXPTIME || '5h';
