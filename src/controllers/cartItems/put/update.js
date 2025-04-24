const { CartItems } = require("../../../database/indexModels");

const update = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        const { id_cart, id_product, quantity } = req.body;

        item.id_cart = id_cart ?? item.id_cart;
        item.id_product = id_product ?? item.id_product;
        item.quantity = quantity ?? item.quantity;

        await item.save();

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error al actualizar ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = update;