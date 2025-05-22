const productCreateSchema = require('./productCreateSchema');
const productUpdateSchema = require('./productUpdateSchema');
const productFilterSchema = require('./productFilterSchema');
const productSearchSchema = require('./productSearchSchema');
const deleteRelationSchema = require('./deleteRelationSchema');
const productRelationSchemas = require('./productRelationsSchemas');
const statusParamSchema = require('./statusParamSchema');
const idParamSchema = require('./idParamSchema');

module.exports = {
    productCreateSchema,
    productUpdateSchema,
    productFilterSchema,
    productSearchSchema,
    deleteRelationSchema,
    productRelationSchemas,
    statusParamSchema,
    idParamSchema
};
