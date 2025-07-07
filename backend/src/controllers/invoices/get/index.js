const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1
        } = req.query;

        const offset = (Number(page) - 1) * Number(limit);

        const invoices = await Invoices.findAll({
            order: [["invoice_date", "DESC"]],
            limit: Number(limit),
            offset: Number(offset),
            raw: true
        });

        return responseHelper.successResponse(res, invoices, "invoices_index");

    } catch (error) {
        console.error("Error al obtener facturas:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_index", 500);
    }
};

module.exports = index;
