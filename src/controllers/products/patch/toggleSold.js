const { Products } = require("../../../database/indexModels");

const toggleSold = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findByPk(id, {
            include: [{ all: true }] 
        });

        if (!product) {
            return res.status(404).json({
                ok: false,
                message: `No se encontró un producto con id ${id}`
            });
        }

        product.is_sold = !product.is_sold;
        await product.save();

        const updatedProduct = await Products.findByPk(id, {
            include: [{ all: true }]
        });

        return res.status(200).json({
            ok: true,
            message: `El estado is_sold del producto con id ${id} fue cambiado a ${updatedProduct.is_sold}`,
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error al cambiar el estado is_sold del producto',
            error: error.message
        });
    }
};

module.exports = toggleSold;