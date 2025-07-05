const invoiceCreateSchema = require("./invoiceCreateSchema");
const invoiceUpdateSchema = require("./invoiceUpdateSchema");
const idParamSchema = require("../shared/idParamSchema");
const invoicesQuerySchema = require("./invoicesQuerySchema");

module.exports = {
    invoiceCreateSchema,
    invoiceUpdateSchema,
    idParamSchema,
    invoicesQuerySchema
};
