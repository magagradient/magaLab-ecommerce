const { DownloadLinks, Products } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const downloadLinkForProduct = async (req, res) => {
    const { id_product } = req.params;

    try {
        // Buscar el producto
        const product = await Products.findByPk(id_product);

        if (!product) {
            return responseHelper.errorResponse(res, "product_not_found", "Producto no encontrado.", "get_download_link_for_product", 404);
        }

        // Obtener el enlace de descarga para el producto
        const downloadLink = await DownloadLinks.findOne({
            where: {
                id_product: id_product,
                used: false, // Suponiendo que no se haya usado el enlace aún
            }
        });

        if (!downloadLink) {
            return responseHelper.errorResponse(res, "download_link_not_found", "Enlace de descarga no encontrado para este producto.", "get_download_link_for_product", 404);
        }

        // Retornar el enlace de descarga
        return responseHelper.successResponse(res, downloadLink, "get_download_link_for_product");

    } catch (error) {
        console.error("Error al obtener el enlace de descarga para el producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "get_download_link_for_product", 500);
    }
};

module.exports = downloadLinkForProduct;
