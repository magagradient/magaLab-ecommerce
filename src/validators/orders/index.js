const orderCreateSchema = require("./orderCreateSchema");
const orderUpdateSchema = require("./orderUpdateSchema");
const idParamSchema = require("../shared/idParamSchema");
const userIdParamSchema = require("../shared/userIdParamSchema");

module.exports = {
    orderCreateSchema,
    orderUpdateSchema,
    idParamSchema,
    userIdParamSchema
};
