const { ShoppingCarts } = require("../../../database/indexModels");

const update = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        const { id_user, created_at } = req.body;

        cart.id_user = id_user ?? cart.id_user;
        cart.created_at = created_at ?? cart.created_at;

        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = update;