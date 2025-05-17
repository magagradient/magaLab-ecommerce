const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await Invoices.findByPk(id);

        if (!invoice) {
            return responseHelper.errorResponse(res, "not_found", "Factura no encontrada.", "invoices_destroy", 404);
        }

        await invoice.destroy();

        return responseHelper.successResponse(res, { message: "Factura eliminada." }, "invoices_destroy");

    } catch (error) {
        console.error("Error al eliminar factura:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_destroy", 500);
    }
};

module.exports = destroy;
