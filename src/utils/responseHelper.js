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

module.exports = {
    successResponse,
    errorResponse,
};
