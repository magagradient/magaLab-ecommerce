const createDownloadLinkSchema = require('./createDownloadLinkSchema');
const updateDownloadLinkSchema = require('./updateDownloadLinkSchema');
const userIdParamSchema = require("../downloadLinks/paramsSchema");
const productIdParamSchema = require("../downloadLinks/paramsSchema");

module.exports = {
    createDownloadLinkSchema,
    updateDownloadLinkSchema,
    userIdParamSchema,
    productIdParamSchema
};