// shared
const idParamSchema = require('./shared/idParamSchema');

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

// blogPosts
const {
    createBlogPostSchema,
    updateBlogPostSchema
} = require('./blogPost');

// productColors
const {
    productColorParamsSchema
} = require('./productColor');

// productImages
const {
    createProductImageSchema,
    productImageParamsSchema
} = require('./productImages');

// productKeywords
const {
    createProductKeywordSchema,
    paramsProductKeywordSchema,
    idProductParamSchema
} = require('./productKeywords');

// cartItems
const {
    createCartItemSchema,
    updateCartItemSchema
} = require('./cartItems');

// coupons
const {
    createCouponSchema,
    updateCouponSchema,
    userCouponParamsSchema,
} = require('./coupons');

// downloadLinks
const {
    createDownloadLinkSchema,
    updateDownloadLinkSchema,
    userIdParamSchema,
    productIdParamSchema
} = require('./downloadLinks')

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

    // blogPost
    createBlogPostSchema,
    updateBlogPostSchema,

    // productColor
    productColorParamsSchema,

    // productimages
    createProductImageSchema,
    productImageParamsSchema,

    // productKeywords
    createProductKeywordSchema,
    paramsProductKeywordSchema,
    idProductParamSchema,

    // cartItems
    createCartItemSchema,
    updateCartItemSchema,

    // coupons
    createCouponSchema,
    updateCouponSchema,
    userCouponParamsSchema,

    // downloadLinks
    createDownloadLinkSchema,
    updateDownloadLinkSchema,
    userIdParamSchema,
    productIdParamSchema
};
