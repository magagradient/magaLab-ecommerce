const { Products } = require("../../../database/indexModels");

const softDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        if (product.is_deleted) {
            return res.status(400).json({ error: "El producto ya está marcado como eliminado" });
        }

        product.is_deleted = true;
        await product.save();

        return res.status(200).json({
            message: "Producto marcado como eliminado (soft delete)",
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error al realizar el soft delete",
            details: error.message,
        });
    }
};

module.exports = softDelete;
