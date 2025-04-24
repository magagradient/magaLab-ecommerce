const { CartItems } = require("../../../database/indexModels");

const destroy = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        await item.destroy();

        return res.status(200).json({
            message: "Ítem eliminado correctamente.",
            deleted: item
        });
    } catch (error) {
        console.error("Error al eliminar ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = destroy;


