const { PaymentMethods, Payments } = require("../database/indexModels");

// Obtener todos los métodos de pago
const index = async (req, res) => {
    try {
        const results = await PaymentMethods.findAll({
            include: { model: Payments, as: "payments" },
        });

        if (results.length === 0) {
            return res.status(404).json({
                error: "No se encontraron métodos de pago.",
                status: "not_found",
                source: "payment_methods",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            results,
            count: results.length,
            status: "success",
            source: "payment_methods",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al obtener métodos de pago:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "payment_methods",
            timestamp: new Date().toISOString(),
        });
    }
};

// Mostrar un método de pago por ID
const show = async (req, res) => {
    try {
        const { id } = req.params;

        const method = await PaymentMethods.findByPk(id, {
            include: { model: Payments, as: "payments" },
        });

        if (!method) {
            return res.status(404).json({
                error: "Método de pago no encontrado.",
                status: "not_found",
                source: "payment_methods_show",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            result: method,
            status: "success",
            source: "payment_methods_show",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al obtener método de pago:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "payment_methods_show",
            timestamp: new Date().toISOString(),
        });
    }
};

// Crear nuevo método de pago
const create = async (req, res) => {
    try {
        const { method_name } = req.body;

        if (!method_name || typeof method_name !== "string") {
            return res.status(400).json({
                error: "El campo method_name es obligatorio y debe ser un string.",
                status: "bad_request",
                source: "payment_methods_create",
                timestamp: new Date().toISOString(),
            });
        }

        const newMethod = await PaymentMethods.create({ method_name });

        const result = await PaymentMethods.findByPk(newMethod.id_payment_method, {
            include: { model: Payments, as: "payments" },
        });

        return res.status(201).json({
            result,
            status: "created",
            source: "payment_methods_create",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al crear método de pago:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "payment_methods_create",
            timestamp: new Date().toISOString(),
        });
    }
};

// Actualizar método de pago
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { method_name } = req.body;

        const method = await PaymentMethods.findByPk(id);

        if (!method) {
            return res.status(404).json({
                error: "Método de pago no encontrado.",
                status: "not_found",
                source: "payment_methods_update",
                timestamp: new Date().toISOString(),
            });
        }

        method.method_name = method_name || method.method_name;
        await method.save();

        const result = await PaymentMethods.findByPk(id, {
            include: { model: Payments, as: "payments" },
        });

        return res.status(200).json({
            result,
            status: "updated",
            source: "payment_methods_update",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al actualizar método de pago:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "payment_methods_update",
            timestamp: new Date().toISOString(),
        });
    }
};

// Eliminar método de pago
const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const method = await PaymentMethods.findByPk(id, {
            include: { model: Payments, as: "payments" },
        });

        if (!method) {
            return res.status(404).json({
                error: "Método de pago no encontrado.",
                status: "not_found",
                source: "payment_methods_destroy",
                timestamp: new Date().toISOString(),
            });
        }

        await method.destroy();

        return res.status(200).json({
            message: "Método de pago eliminado correctamente.",
            deleted: method,
            status: "deleted",
            source: "payment_methods_destroy",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al eliminar método de pago:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "payment_methods_destroy",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
