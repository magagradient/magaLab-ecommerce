const productCreateSchema = require('./products/productCreateSchema');
const productUpdateSchema = require('./products/productUpdateSchema');
const productFilterSchema = require('./products/productFilterSchema');
const productSearchSchema = require('./products/productSearchSchema');
const deleteRelationSchema = require('./products/deleteRelationSchema');
const productRelationSchemas = require('./products/productRelationsSchemas');
const statusParamSchema = require('./products/statusParamSchema');
const idParamSchema = require('./products/idParamSchema');

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
