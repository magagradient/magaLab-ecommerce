const successResponse = (res, data = [], source = "") => {
    return res.status(200).json({
        status: "success",
        data,
        total: Array.isArray(data) ? data.length : undefined,
        source,
        timestamp: new Date().toISOString(),
    });
};

const errorResponse = (res, error = "server_error", description = "", source = "", code = 500) => {
    return res.status(code).json({
        status: "error",
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
