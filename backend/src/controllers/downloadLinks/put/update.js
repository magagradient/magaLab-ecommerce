const { DownloadLinks } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const update = async (req, res) => {
    const { id } = req.params;
    const { used, expires_at } = req.body;

    try {
        const downloadLink = await DownloadLinks.findByPk(id);

        if (!downloadLink) {
            return responseHelper.errorResponse(res, "download_link_not_found", "Enlace de descarga no encontrado.", "update_download_link", 404);
        }

        if (used !== undefined) downloadLink.used = used;
        if (expires_at) downloadLink.expires_at = expires_at;

        await downloadLink.save();

        return responseHelper.successResponse(res, downloadLink, "update_download_link");

    } catch (error) {
        console.error("Error al actualizar el enlace de descarga:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "update_download_link", 500);
    }
};

module.exports = update;
