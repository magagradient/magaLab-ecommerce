const { Colors, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        console.log("Ejecutando controlador index...");
        const colors = await Colors.findAll({
            include: {
                model: Products,
                as: 'products',
                attributes: ['id_product', 'title', 'price']
            }
        });

        if (colors.length === 0) {
            return responseHelper.successResponse(res, [], "colors_index");
        }

        return responseHelper.successResponse(res, colors, "colors_index");
    } catch (error) {
        console.error("Error al obtener los colores:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_index", 500);
    }
};


module.exports = index;
