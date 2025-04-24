const { ShoppingCarts } = require("../../../database/indexModels");

const show = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = show;