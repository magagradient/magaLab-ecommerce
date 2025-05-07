const { Authors } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { name, bio, avatar_url } = req.body;

    if (!name) {
        return responseHelper.errorResponse(res, "missing_name", "El nombre del autor es obligatorio.", "authors_create", 400);
    }

    try {
        const newAuthor = await Authors.create({
            name,
            bio: bio || null,
            avatar_url: avatar_url || null,
        });

        return responseHelper.successResponse(res, newAuthor, "authors_create");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "authors_create", 500);
    }
};

module.exports = create;
