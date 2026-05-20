const { Orders, OrdersProducts, Products } = require("../../../database/indexModels");

const webhookMercadoPago = async (req, res) => {
    try {
        const { type, data } = req.body;

        console.log("Webhook MP recibido:", type, data);

        if (type !== "payment") {
            return res.sendStatus(200);
        }

        // Consultar el pago a la API de MP
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
        });

        const payment = await mpRes.json();
        console.log("Pago MP:", payment.status, payment.external_reference);

        if (payment.status !== "approved") {
            return res.sendStatus(200);
        }

        const id_order = parseInt(payment.external_reference);

        // Actualizar orden a paid
        const order = await Orders.findByPk(id_order);
        if (order) {
            order.status = "paid";
            await order.save();
        }

        // Marcar productos como vendidos
        const orderProducts = await OrdersProducts.findAll({ where: { id_order } });
        for (const op of orderProducts) {
            const product = await Products.findByPk(op.id_product);
            if (product) {
                product.is_sold = true;
                await product.save();
            }
        }

        return res.sendStatus(200);

    } catch (error) {
        console.error("Error en webhook MP:", error);
        return res.sendStatus(500);
    }
};

module.exports = webhookMercadoPago;