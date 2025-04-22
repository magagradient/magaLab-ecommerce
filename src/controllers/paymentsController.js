const { Payments, Orders, PaymentMethods, Users } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const payments = await Payments.findAll({
            include: [
                {
                    model: Orders,
                    as: "order",
                    include: {
                        model: Users,
                        as: "user",
                        attributes: ["id_user", "name", "email"]
                    }
                },
                {
                    model: PaymentMethods,
                    as: "paymentMethod"
                }
            ]
        });

        return res.status(200).json({ total: payments.length, timestamp: new Date(), data: payments });
    } catch (error) {
        console.error("Error al obtener los pagos:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payments.findByPk(id, {
            include: [
                {
                    model: Orders,
                    as: "order",
                    include: {
                        model: Users,
                        as: "user",
                        attributes: ["id_user", "name", "email"]
                    }
                },
                {
                    model: PaymentMethods,
                    as: "paymentMethod"
                }
            ]
        });

        if (!payment) return res.status(404).json({ error: "Pago no encontrado." });

        return res.status(200).json(payment);
    } catch (error) {
        console.error("Error al buscar el pago:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_order, id_payment_method, status, amount_paid, payment_date } = req.body;

        if (!id_order || !id_payment_method || !status || !amount_paid) {
            return res.status(400).json({ error: "Faltan campos obligatorios: id_order, id_payment_method, status, amount_paid." });
        }

        const newPayment = await Payments.create({
            id_order,
            id_payment_method,
            status,
            amount_paid,
            payment_date
        });

        const created = await Payments.findByPk(newPayment.id_payment, {
            include: [
                {
                    model: Orders,
                    as: "order",
                    include: {
                        model: Users,
                        as: "user",
                        attributes: ["id_user", "name", "email"]
                    }
                },
                {
                    model: PaymentMethods,
                    as: "paymentMethod"
                }
            ]
        });

        return res.status(201).json(created);
    } catch (error) {
        console.error("Error al crear el pago:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByPk(id);

        if (!payment) return res.status(404).json({ error: "Pago no encontrado." });

        await payment.update(req.body);

        const updated = await Payments.findByPk(id, {
            include: [
                {
                    model: Orders,
                    as: "order",
                    include: {
                        model: Users,
                        as: "user",
                        attributes: ["id_user", "name", "email"]
                    }
                },
                {
                    model: PaymentMethods,
                    as: "paymentMethod"
                }
            ]
        });

        return res.status(200).json(updated);
    } catch (error) {
        console.error("Error al actualizar el pago:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByPk(id, {
            include: [
                {
                    model: Orders,
                    as: "order",
                    include: {
                        model: Users,
                        as: "user",
                        attributes: ["id_user", "name", "email"]
                    }
                },
                {
                    model: PaymentMethods,
                    as: "paymentMethod"
                }
            ]
        });

        if (!payment) return res.status(404).json({ error: "Pago no encontrado." });

        await payment.destroy();

        return res.status(200).json({ message: "Pago eliminado correctamente.", deleted: payment });
    } catch (error) {
        console.error("Error al eliminar el pago:", error);
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