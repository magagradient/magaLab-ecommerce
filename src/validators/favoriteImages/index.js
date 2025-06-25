const createFavoriteImageSchema = require("../favoriteImages/createFavoriteImageSchema");
const idParamSchema = require("../shared/idParamSchema");
const userIdParamSchema = require("../favoriteImages/userIdParamSchema");
const deleteByUserAndImageParamsSchema = require('./deleteByUserAndImageParamsSchema')


module.exports = {
    createFavoriteImageSchema,
    idParamSchema,
    userIdParamSchema,
    deleteByUserAndImageParamsSchema
};
