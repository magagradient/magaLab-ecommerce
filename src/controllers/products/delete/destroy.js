const { Products, Categories, Series } = require("../../../database/indexModels");

const destroy = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

        await product.destroy();

        return res.status(200).json({
            message: "Producto eliminado correctamente.",
            deleted: product
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = destroy;

