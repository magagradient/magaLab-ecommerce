const dbMiddleware = (req, res, next) => {
    const startTime = Date.now(); // Mide el tiempo de inicio

    res.on("finish", () => {  // Ejecuta cuando la respuesta ha sido enviada
        const duration = Date.now() - startTime; 
        console.log(`📡 ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`);
    });

    next();
};

module.exports = dbMiddleware;
