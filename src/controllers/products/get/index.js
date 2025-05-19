const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const products = await Products.findAll({
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" },
                { model: Keywords, as: "keywords", through: { attributes: [] } },
                { model: Colors, as: "colors", through: { attributes: [] } },
                { model: Styles, as: "styles", through: { attributes: [] } },
                { model: Themes, as: "themes", through: { attributes: [] } }
            ],
            order: [["createdAt", "DESC"]]
        });

        const productsData = products.map(product => product.get({ plain: true }));

        if (productsData.length === 0) {
            return errorResponse(
                res,
                "not_found",
                "No hay productos disponibles.",
                "products_index",
                404
            );
        }

        return successResponse(res, productsData, "products_index");
    } catch (error) {
        console.error("🔴 Error al obtener productos:", error);
        return errorResponse(
            res,
            "server_error",
            "Error interno del servidor.",
            "products_index",
            500
        );
    }
};

module.exports = index;
