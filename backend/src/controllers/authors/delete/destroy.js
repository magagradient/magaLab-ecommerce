const { Authors } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Authors.findByPk(id);

        if (!author) {
            return responseHelper.errorResponse(res, "author_not_found", "Autor no encontrado.", "authors_delete", 404);
        }

        await author.destroy();

        return responseHelper.successResponse(res, null, "authors_delete");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "authors_delete", 500);
    }
};

module.exports = destroy;
