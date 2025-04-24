const { CartItems } = require("../../../database/indexModels");

const create = async (req, res) => {
    try {
        const { id_cart, id_product, quantity } = req.body;

        if (!id_cart || !id_product) {
            return res.status(400).json({ error: "Los campos 'id_cart' y 'id_product' son obligatorios." });
        }

        const newItem = await CartItems.create({
            id_cart,
            id_product,
            quantity: quantity ?? 1
        });

        return res.status(201).json(newItem);
    } catch (error) {
        console.error("Error al crear ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = create;