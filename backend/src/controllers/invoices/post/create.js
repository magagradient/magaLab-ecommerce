const { Invoices } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_order, invoice_number, total_amount } = req.body;

    try {
        const newInvoice = await Invoices.create({
            id_order,
            invoice_number,
            total_amount
        });

        return responseHelper.successResponse(res, newInvoice, "invoices_create", 201);

    } catch (error) {
        console.error("Error al crear factura:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return responseHelper.errorResponse(res, "conflict", "El número de factura ya existe.", "invoices_create", 409);
        }

        if (error.name === "SequelizeForeignKeyConstraintError") {
            return responseHelper.errorResponse(res, "bad_request", "El id_order no existe.", "invoices_create", 400);
        }

        return responseHelper.errorResponse(res, "server_error", error.message, "invoices_create", 500);
    }
};

module.exports = create;
