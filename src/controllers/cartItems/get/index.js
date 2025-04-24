const { CartItems } = require("../../../database/indexModels");


const index = async (req, res) => {
    try {
        const items = await CartItems.findAll();

        if (items.length === 0) {
            return res.status(404).json({ error: "No hay ítems en el carrito." });
        }

        return res.status(200).json({
            results: items,
            total: items.length,
            status: "success",
            source: "cart_items",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener ítems del carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = index;

