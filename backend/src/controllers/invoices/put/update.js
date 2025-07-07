const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { invoice_number, total_amount, issued_at } = req.body;

    try {
        const invoice = await Invoices.findByPk(id);

        if (!invoice) {
            return responseHelper.errorResponse(res, "not_found", "Factura no encontrada.", "invoices_update", 404);
        }

        await invoice.update({
            invoice_number,
            total_amount,
            issued_at
        });

        return responseHelper.successResponse(res, invoice, "invoices_update");

    } catch (error) {
        console.error("Error al actualizar factura:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return responseHelper.errorResponse(res, "conflict", "El número de factura ya existe.", "invoices_update", 409);
        }

        if (error.name === "SequelizeForeignKeyConstraintError") {
            return responseHelper.errorResponse(res, "bad_request", "El id_order no existe.", "invoices_update", 400);
        }

        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_update", 500);
    }
};

module.exports = update;
