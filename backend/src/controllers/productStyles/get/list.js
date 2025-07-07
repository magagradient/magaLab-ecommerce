const { ProductStyles, Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const list = async (req, res) => {
    const { id } = req.params; // id_product

    try {
        const styles = await ProductStyles.findAll({
            where: { id_product: id },
            include: {
                model: Styles,
                as: "style",
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        });

        return responseHelper.successResponse(res, styles, "product_styles_list");
    } catch (error) {
        console.error("Error al obtener estilos del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_styles_list", 500);
    }
};

module.exports = list;
