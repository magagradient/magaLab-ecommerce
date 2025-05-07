const { Authors } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const update = async (req, res) => {
    const { id } = req.params;
    const { name, bio, avatar_url } = req.body;

    if (!name) {
        return responseHelper.errorResponse(res, "missing_name", "El nombre del autor es obligatorio.", "authors_update", 400);
    }

    try {
        const author = await Authors.findByPk(id);

        if (!author) {
            return responseHelper.errorResponse(res, "author_not_found", "Autor no encontrado.", "authors_update", 404);
        }

        author.name = name;
        author.bio = bio || author.bio;
        author.avatar_url = avatar_url || author.avatar_url;

        await author.save();

        return responseHelper.successResponse(res, author, "authors_update");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "authors_update", 500);
    }
};

module.exports = update;
