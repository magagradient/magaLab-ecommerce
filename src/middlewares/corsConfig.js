const cors = require('cors');

const whitelist = [
    'http://localhost:3000',
    'https://tu-dominio-produccion.com',
    // agregá acá otros dominios que quieras permitir
];

const corsOptions = {
    origin: (origin, callback) => {
        // permitir requests sin origin (Postman, curl)
        if (!origin) return callback(null, true);

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS: Origen no permitido'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // headers permitidos
    credentials: true, // si querés habilitar cookies o auth con credenciales
    optionsSuccessStatus: 204, // para navegadores legacy (IE11, algunos móviles)
};

module.exports = cors(corsOptions);
