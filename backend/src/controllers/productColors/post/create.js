const { ProductColors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id } = req.params; // id_product
    const { color_ids } = req.body;

    if (!Array.isArray(color_ids) || color_ids.length === 0) {
        return responseHelper.errorResponse(res, "invalid_data", "Debe proporcionar un array de IDs de colores.", "product_colors_create", 400);
    }

    try {
        const records = color_ids.map(colorId => ({
            id_product: id,
            id_color: colorId
        }));

        await ProductColors.bulkCreate(records, { ignoreDuplicates: true });

        return responseHelper.successResponse(res, null, "product_colors_create");
    } catch (error) {
        console.error("Error al asociar colores:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_colors_create", 500);
    }
};

module.exports = create;
