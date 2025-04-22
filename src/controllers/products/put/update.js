const { Products, Categories, Series } = require("../../../database/indexModels");

// actualizar:
const update = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            is_sold,
            sold_at,
            id_category,
            id_series
        } = req.body;

        const product = await Products.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.is_sold = is_sold ?? product.is_sold;
        product.sold_at = sold_at ?? product.sold_at;
        product.id_category = id_category ?? product.id_category;
        product.id_series = id_series ?? product.id_series;

        await product.save();

        const updatedProduct = await Products.findByPk(product.id_product, {
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ]
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = update; 