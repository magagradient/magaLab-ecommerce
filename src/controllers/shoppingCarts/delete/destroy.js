const { ShoppingCarts } = require("../database/indexModels");

const destroy = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        await cart.destroy();

        return res.status(200).json({
            message: "Carrito eliminado correctamente.",
            deleted: cart
        });
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = destroy;