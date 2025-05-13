const { DownloadLinks, Products, Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { id_user, id_product, download_url, expires_at } = req.body;

    try {
        const user = await Users.findByPk(id_user);
        const product = await Products.findByPk(id_product);

        if (!user || !product) {
            return responseHelper.errorResponse(res, "user_or_product_not_found", "Usuario o producto no encontrado.", "download_links_create", 404);
        }

        const newDownloadLink = await DownloadLinks.create({
            id_user,
            id_product,
            download_url,
            expires_at,
        });

        
        return responseHelper.successResponse(res, newDownloadLink, "download_links_create");

    } catch (error) {
        console.error("Error al crear el enlace de descarga:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "download_links_create", 500);
    }
};

module.exports = create;
