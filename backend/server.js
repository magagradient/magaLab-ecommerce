require("dotenv").config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET no está definido o es demasiado corto");
}
const express = require("express");
const xss = require('xss-clean');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("./src/middlewares/corsConfig"); 

const errorHandler = require("./src/middlewares/errorHandler");
const routes = require("./src/routes/indexRouter");
const { connectDB } = require("./src/database/indexModels");

const app = express();
const PORT = process.env.PORT || 3000;

// seguridad y cors
app.use(helmet());
app.use(cors);
app.use(morgan("dev")); 

// middleware
app.use(express.json());
app.use(xss()); 

// rutas
app.use("/api", routes);

// middleware de manejo de errores global
app.use(errorHandler);

// conectar a la base de datos y luego iniciar el servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos. Servidor no iniciado.");
        process.exit(1); // cierra el proceso si hay error de conexión
    });
