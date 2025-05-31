const {
    productCreateSchema,
    productUpdateSchema,
    productFilterSchema,
    productSearchSchema,
    deleteRelationSchema,
    productRelationSchemas,
    statusParamSchema,
    idParamSchema,
    updateRelationsSchema,
    productsArraySchema,   
} = require('./products/index');  

const {
    idParamSchema: categoryIdParamSchema,
    categoryCreateSchema,
    categoryUpdateSchema

} = require('./categories');

module.exports = {
    productCreateSchema,
    productUpdateSchema,
    productFilterSchema,
    productSearchSchema,
    deleteRelationSchema,
    productRelationSchemas,
    statusParamSchema,
    idParamSchema,
    updateRelationsSchema,
    productsArraySchema,

        // Schemas categories
    categoryIdParamSchema,
    categoryCreateSchema,
    categoryUpdateSchema
};
