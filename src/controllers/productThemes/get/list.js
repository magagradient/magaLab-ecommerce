const { ProductThemes, Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const list = async (req, res) => {
    const { id } = req.params;

    try {
        const themes = await ProductThemes.findAll({
            where: { id_product: id },
            include: {
                model: Themes,
                as: "theme",
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        });

        return responseHelper.successResponse(res, themes, "product_themes_list");
    } catch (error) {
        console.error("Error al obtener temas del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_themes_list", 500);
    }
};

module.exports = list;
