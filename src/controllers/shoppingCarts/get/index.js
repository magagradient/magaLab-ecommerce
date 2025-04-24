const { ShoppingCarts } = require("../../../database/indexModels");

const index = async (req, res) => {
    try {
        const carts = await ShoppingCarts.findAll();

        if (carts.length === 0) {
            return res.status(404).json({ error: "No hay carritos registrados." });
        }

        return res.status(200).json({
            results: carts,
            total: carts.length,
            status: "success",
            source: "shopping_carts",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = index;