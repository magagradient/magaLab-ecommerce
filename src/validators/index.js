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
} = require('./styles');

// themes
const {
    createThemeSchema,
    updateThemeSchema,
    idParamSchema: themeIdParamSchema
} = require("./themes");

// keywords
const {
    createKeywordSchema,
    updateKeywordSchema,
    idParamSchema: keywordIdParamSchema
} = require('./keywords');

// series
const {
    createSeriesSchema,
    updateSeriesSchema,
    idParamSchema: seriesIdParamSchema,
} = require("./series");


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

    // schemas themes
    createThemeSchema,
    updateThemeSchema,
    themeIdParamSchema,

    // schemas keywords
    createKeywordSchema,
    updateKeywordSchema,
    keywordIdParamSchema,

    // schemas series
    createSeriesSchema,
    updateSeriesSchema,
    seriesIdParamSchema,
};
