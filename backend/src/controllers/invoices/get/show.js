const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await Invoices.findByPk(id, { raw: true });

        if (!invoice) {
            return responseHelper.errorResponse(res, "not_found", "Factura no encontrada.", "invoices_show", 404);
        }

        return responseHelper.successResponse(res, invoice, "invoices_show");

    } catch (error) {
        console.error("Error al obtener factura:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_show", 500);
    }
};

module.exports = show;
