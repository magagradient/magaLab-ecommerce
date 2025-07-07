const { Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const styles = await Styles.findAll();
        return responseHelper.successResponse(res, styles, "styles_index");
    } catch (error) {
        console.error("Error al obtener estilos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "styles_index", 500);
    }
};

module.exports = index;
