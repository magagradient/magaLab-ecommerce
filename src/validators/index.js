// products
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

// categories
const {
    idParamSchema: categoryIdParamSchema,
    categoryCreateSchema,
    categoryUpdateSchema

} = require('./categories');

// colors
const {
    colorCreateSchema,
    colorUpdateSchema,
    idParamSchema: colorIdParamSchema
} = require('./colors');

// styles
const {
    createStyleSchema,
    updateStyleSchema,
    idParamSchema: styleIdParamSchema
} = require('./colors');


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
    categoryUpdateSchema,

      // Schemas colors
    colorCreateSchema,
    colorUpdateSchema,
    colorIdParamSchema,

    // schmas styles
    createStyleSchema,
    updateStyleSchema,
    styleIdParamSchema,
};
