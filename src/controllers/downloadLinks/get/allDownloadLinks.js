const { DownloadLinks } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const allDownloadLinks = async (req, res) => {
    try {
        const downloadLinks = await DownloadLinks.findAll();

        if (downloadLinks.length === 0) {
            return responseHelper.successResponse(res, [], "get_all_download_links");
        }

        return responseHelper.successResponse(res, downloadLinks, "get_all_download_links");

    } catch (error) {
        console.error("Error al obtener los enlaces de descarga:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "get_all_download_links", 500);
    }
};

module.exports = allDownloadLinks;
