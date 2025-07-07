const { ProductThemes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id } = req.params;
    const { theme_ids } = req.body;

    if (!Array.isArray(theme_ids) || theme_ids.length === 0) {
        return responseHelper.errorResponse(res, "invalid_data", "Debe enviar un array de IDs de temas.", "product_themes_create", 400);
    }

    try {
        const records = theme_ids.map(themeId => ({
            id_product: id,
            id_theme: themeId
        }));

        await ProductThemes.bulkCreate(records, { ignoreDuplicates: true });

        return responseHelper.successResponse(res, null, "product_themes_create");
    } catch (error) {
        console.error("Error al asociar temas:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_themes_create", 500);
    }
};

module.exports = create;
