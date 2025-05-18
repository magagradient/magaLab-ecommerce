const { ProductKeywords, Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const byProduct = async (req, res) => {
    const { id_product } = req.params;

    try {
        const result = await ProductKeywords.findAll({
            where: { id_product },
            include: [{ model: Keywords,
                as: "keyword", 
                attributes: ["id_keyword", "name"] }]
        });

        return responseHelper.successResponse(res, result, "product_keywords_by_product");
    } catch (error) {
        console.error("Error al obtener keywords del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_keywords_by_product", 500);
    }
};

module.exports = byProduct;
