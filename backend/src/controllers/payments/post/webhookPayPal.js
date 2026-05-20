const { Orders, OrdersProducts, Products } = require("../../../database/indexModels");

const webhookPayPal = async (req, res) => {
    try {
        const event = req.body;

        console.log("Webhook PayPal recibido:", event.event_type);

        if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
            return res.sendStatus(200);
        }

        const id_order = parseInt(event.resource.supplementary_data?.related_ids?.order_id || 0);

        if (!id_order) {
            console.log("No se encontró id_order en el webhook PayPal");
            return res.sendStatus(200);
        }

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
        console.error("Error en webhook PayPal:", error);
        return res.sendStatus(500);
    }
};

module.exports = webhookPayPal;