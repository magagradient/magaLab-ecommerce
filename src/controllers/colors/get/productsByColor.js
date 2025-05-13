const { Colors, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const productsByColor = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Colors.findByPk(id, {
            include: {
                model: Products,
                as: "products", 
                attributes: ["id_product", "title", "price", "description"],
            }
        });

        if (!color) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró un color con el ID ${id}.`,
                "colors_products",
                404
            );
        }

        return responseHelper.successResponse(res, color.products, "colors_products");
    } catch (error) {
        console.error("Error al obtener los productos del color:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_products", 500);
    }
};

module.exports = productsByColor;
