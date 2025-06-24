const createFavoriteImageSchema = require("../favoriteImages/createFavoriteImageSchema");
const idParamSchema = require("../shared/idParamSchema");
const userIdParamSchema = require("../favoriteImages/userIdParamSchema");
const imageIdParamSchema = require("../favoriteImages/imageIdParamSchema");

module.exports = {
    createFavoriteImageSchema,
    idParamSchema,
    userIdParamSchema,
    imageIdParamSchema
};
