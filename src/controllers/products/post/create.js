const { Products, Categories, Series } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const create = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            is_sold,
            sold_at,
            id_category,
            id_series
        } = req.body;

        if (!title || price === undefined) {
            return errorResponse(res, "bad_request", "Faltan campos obligatorios: title y price.", "products/create", 400);
        }

        const newProduct = await Products.create({
            title,
            description,
            price,
            is_sold: is_sold ?? false,
            sold_at,
            id_category,
            id_series: id_series ?? null
        });

        const createdProduct = await Products.findByPk(newProduct.id_product, {
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ]
        });

        return successResponse(res, createdProduct, "products/create");
    } catch (error) {
        console.error("Error al crear producto:", error);
        return errorResponse(res, "server_error", "Error interno del servidor", "products/create", 500);
    }
};

module.exports = create;
