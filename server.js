const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const dbMiddleware = require("./src/middlewares/db_middleware");
const routes = require("./src/routes/indexRouter");
const { connectDB } = require("./src/database/indexModels");

const app = express();
const PORT = process.env.PORT || 3000;

// seguridad y cors
app.use(helmet());
app.use(cors());

// middleware
app.use(express.json());
app.use(dbMiddleware);

// rutas
app.use("/api", routes);

// middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
    .status(500)
    .json({ error: "Error interno del servidor" });
});

// conectar a la base de datos y luego iniciar el servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ No se pudo conectar a la base de datos. Servidor no iniciado.");
        process.exit(1); // cierra el proceso si hay error de conexión
    });
