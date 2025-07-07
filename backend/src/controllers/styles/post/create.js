const { Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return responseHelper.errorResponse(res, "invalid_data", "El campo 'name' es obligatorio.", "styles_create", 400);
    }

    try {
        const newStyle = await Styles.create({ name });
        return responseHelper.successResponse(res, newStyle, "styles_create", 201);
    } catch (error) {
        console.error("Error al crear estilo:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "styles_create", 500);
    }
};

module.exports = create;
