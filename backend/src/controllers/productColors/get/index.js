const { ProductColors, Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    const { id } = req.params;

    try {
        const colors = await ProductColors.findAll({
            where: { id_product: id },
            include: [{
                model: Colors,
                as: "color", 
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }]
        });

        const result = colors.map(pc => pc.color); 

        return responseHelper.successResponse(res, result, "product_colors_list");
    } catch (error) {
        console.error("Error al obtener colores del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_colors_list", 500);
    }
};

module.exports = index;
