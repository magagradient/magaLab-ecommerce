const { Products } = require("../../../database/indexModels");

const softDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // No es necesario verificar si ya está eliminado, ya que Sequelize lo maneja automáticamente
        // Cuando usamos paranoid, el producto se marca automáticamente como "eliminado".

        await product.destroy(); // Soft delete

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
