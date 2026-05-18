const paypal = require("@paypal/paypal-server-sdk");

const client = new paypal.Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID,
        oAuthClientSecret: process.env.PAYPAL_SECRET,
    },
    environment: paypal.Environment.Sandbox,
});

const createPayPalOrder = async (req, res) => {
    try {
        const { items, id_order } = req.body;

        const total = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);

        const ordersController = new paypal.OrdersController(client);

        const response = await ordersController.createOrder({
            body: {
                intent: "CAPTURE",
                purchaseUnits: [
                    {
                        referenceId: String(id_order),
                        amount: {
                            currencyCode: "USD",
                            value: total.toFixed(2),
                        },
                    },
                ],
                applicationContext: {
                    returnUrl: "http://localhost:5173/checkout/success",
                    cancelUrl: "http://localhost:5173/checkout/failure",
                },
            },
        });

        const approvalUrl = response.result.links.find(link => link.rel === "approve")?.href;
        return res.json({ approval_url: approvalUrl });

    } catch (error) {
        console.error("Error creando orden PayPal:", error);
        return res.status(500).json({ message: "Error al crear orden de PayPal" });
    }
};

module.exports = createPayPalOrder;