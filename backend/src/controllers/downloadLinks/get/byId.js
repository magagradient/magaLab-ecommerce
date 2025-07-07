const { DownloadLinks } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const byId = async (req, res) => {
    const { id } = req.params;

    try {
        const downloadLink = await DownloadLinks.findByPk(id);

        if (!downloadLink) {
            return responseHelper.errorResponse(res, "download_link_not_found", "Enlace de descarga no encontrado.", "get_download_link_by_id", 404);
        }

        return responseHelper.successResponse(res, downloadLink, "get_download_link_by_id");

    } catch (error) {
        console.error("Error al obtener el enlace de descarga:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "get_download_link_by_id", 500);
    }
};

module.exports = byId;
