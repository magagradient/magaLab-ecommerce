const { ProductStyles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id } = req.params; // id_product
    const { style_ids } = req.body;

    if (!Array.isArray(style_ids) || style_ids.length === 0) {
        return responseHelper.errorResponse(res, "invalid_data", "Debe enviar un array de IDs de estilos.", "product_styles_create", 400);
    }

    try {
        const records = style_ids.map(styleId => ({
            id_product: id,
            id_style: styleId
        }));

        await ProductStyles.bulkCreate(records, { ignoreDuplicates: true });

        return responseHelper.successResponse(res, null, "product_styles_create");
    } catch (error) {
        console.error("Error al asociar estilos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_styles_create", 500);
    }
};

module.exports = create;
