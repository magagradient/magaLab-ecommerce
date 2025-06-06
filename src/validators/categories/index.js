const categoryUpdateSchema = require('./updateSchema');
const categoryCreateSchema = require('./createSchema');
const idParamSchema = require("../shared/idParamSchema");

module.exports = {
    idParamSchema,
    categoryCreateSchema,
    categoryUpdateSchema
}