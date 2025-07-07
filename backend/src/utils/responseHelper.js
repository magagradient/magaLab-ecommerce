const successResponse = (res, data = null, source = "") => {
    const response = {
        status: "success",
        data,
        source,
        timestamp: new Date().toISOString(),
    };

    if (Array.isArray(data)) {
        response.total = data.length;
    }

    return res.status(200).json(response);
};

const errorResponse = (res, error = "server_error", description = "", source = "", code = 500) => {
    return res.status(code).json({
        status: "error",
        code,
        error,
        description,
        source,
        timestamp: new Date().toISOString(),
    });
};

// Nueva función para errores de validación
const validationErrorResponse = (res, details = [], source = "") => {
    return res.status(400).json({
        status: "fail",
        message: "Error de validación.",
        details,  // array con objetos {field, message, type}
        source,
        timestamp: new Date().toISOString(),
    });
};

module.exports = {
    successResponse,
    errorResponse,
    validationErrorResponse,
};
