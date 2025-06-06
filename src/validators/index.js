// products
const {
    productCreateSchema,
    productUpdateSchema,
    productFilterSchema,
    productSearchSchema,
    deleteRelationSchema,
    productRelationSchemas,
    statusParamSchema,
    updateRelationsSchema,
    productsArraySchema,
} = require('./products');

// categories
const {
    categoryCreateSchema,
    categoryUpdateSchema
} = require('./categories');

// colors
const {
    colorCreateSchema,
    colorUpdateSchema
} = require('./colors');

// styles
const {
    createStyleSchema,
    updateStyleSchema
} = require('./styles');

// themes
const {
    createThemeSchema,
    updateThemeSchema
} = require("./themes");

// keywords
const {
    createKeywordSchema,
    updateKeywordSchema
} = require('./keywords');

// series
const {
    createSeriesSchema,
    updateSeriesSchema
} = require("./series");

// authors
const {
    createAuthorSchema,
    updateAuthorSchema
} = require('./authors');

// shared
const idParamSchema = require('./shared/idParamSchema');

// export general
module.exports = {
    // products
    productCreateSchema,
    productUpdateSchema,
    productFilterSchema,
    productSearchSchema,
    deleteRelationSchema,
    productRelationSchemas,
    statusParamSchema,
    updateRelationsSchema,
    productsArraySchema,

    // categories
    categoryCreateSchema,
    categoryUpdateSchema,

    // colors
    colorCreateSchema,
    colorUpdateSchema,

    // styles
    createStyleSchema,
    updateStyleSchema,

    // themes
    createThemeSchema,
    updateThemeSchema,

    // keywords
    createKeywordSchema,
    updateKeywordSchema,

    // series
    createSeriesSchema,
    updateSeriesSchema,

    // authors
    createAuthorSchema,
    updateAuthorSchema,

    // shared
    idParamSchema,
};
