const { Invoices } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const invoices = await Invoices.findAll();

        if (invoices.length === 0) {
            return res.status(404).json({ error: "No hay facturas registradas." });
        }

        return res.status(200).json({
            results: invoices,
            total: invoices.length,
            status: "success",
            source: "invoices",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener facturas:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const invoice = await Invoices.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ error: "Factura no encontrada." });
        }

        return res.status(200).json(invoice);
    } catch (error) {
        console.error("Error al obtener la factura:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_order, invoice_number, issued_at, total_amount } = req.body;

        if (!id_order || !invoice_number || !total_amount) {
            return res.status(400).json({ error: "Los campos 'id_order', 'invoice_number' y 'total_amount' son obligatorios." });
        }

        const newInvoice = await Invoices.create({
            id_order,
            invoice_number,
            issued_at,
            total_amount
        });

        return res.status(201).json(newInvoice);
    } catch (error) {
        console.error("Error al crear factura:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const invoice = await Invoices.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ error: "Factura no encontrada." });
        }

        const { id_order, invoice_number, issued_at, total_amount } = req.body;

        invoice.id_order = id_order ?? invoice.id_order;
        invoice.invoice_number = invoice_number ?? invoice.invoice_number;
        invoice.issued_at = issued_at ?? invoice.issued_at;
        invoice.total_amount = total_amount ?? invoice.total_amount;

        await invoice.save();

        return res.status(200).json(invoice);
    } catch (error) {
        console.error("Error al actualizar factura:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const invoice = await Invoices.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ error: "Factura no encontrada." });
        }

        await invoice.destroy();

        return res.status(200).json({
            message: "Factura eliminada correctamente.",
            deleted: invoice
        });
    } catch (error) {
        console.error("Error al eliminar factura:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
