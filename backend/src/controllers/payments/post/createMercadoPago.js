const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const createMercadoPagoPreference = async (req, res) => {
  try {
    console.log("body recibido:", req.body);
    const { items, id_order } = req.body;

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.title,
          unit_price: Number(item.unit_price),
          quantity: Number(item.quantity),
          currency_id: "ARS",
        })),
        back_urls: {
          success: "https://www.google.com",
          failure: "https://www.google.com",
          pending: "https://www.google.com",
        },
        auto_return: "approved",
        external_reference: String(id_order),
      },
    });

    return res.json({ init_point: response.init_point });

  } catch (error) {
    console.error("Error creando preferencia MP:", error);
    return res.status(500).json({ message: "Error al crear preferencia de pago" });
  }
};

module.exports = createMercadoPagoPreference;