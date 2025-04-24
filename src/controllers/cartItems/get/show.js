const { CartItems } = require("../../../database/indexModels");

const show = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error al obtener ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};


module.exports = show;