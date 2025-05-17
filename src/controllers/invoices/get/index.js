const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    const timestamp = new Date().toISOString();

    try {
        const invoices = await Invoices.findAll({ raw: true });

        return responseHelper.successResponse(res, invoices, "invoices_index");

    } catch (error) {
        console.error("Error al obtener facturas:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_index", 500);
    }
};

module.exports = index;
