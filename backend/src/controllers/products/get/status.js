const { Products, Categories, Series } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const status = async (req, res) => {
    const { type } = req.params;

    if (!["sold", "available"].includes(type)) {
        return errorResponse(
            res,
            "bad_request",
            "Parámetro inválido. Usá 'sold' o 'available'.",
            "products_status",
            400
        );
    }

    const isSold = type === "sold";

    try {
        const products = await Products.findAll({
            where: { is_sold: isSold },
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ],
            order: isSold
                ? [["sold_at", "DESC"]]
                : [["createdAt", "DESC"]]
        });

        return successResponse(
            res,
            {
                results: products,
                total: products.length,
                filter: type,
                ordered_by: isSold ? "sold_at DESC" : "createdAt DESC",
                source: "/products/status/:type"
            },
            "products_status"
        );

    } catch (error) {
        console.error("Error al filtrar productos por estado:", error);
        return errorResponse(
            res,
            "server_error",
            "Error interno del servidor",
            "products_status",
            500
        );
    }
};

module.exports = status;
