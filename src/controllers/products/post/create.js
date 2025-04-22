const { Products, Categories, Series } = require("../../../database/indexModels");

const create = async (req, res) => {
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


        if (!title || !price) {
            return res.status(400).json({ error: "Faltan campos obligatorios: title y price." });
        }

        const newProduct = await Products.create({
            title,
            description,
            price,
            is_sold: is_sold ?? false,
            sold_at,
            id_category,
            id_series: id_series ?? null
        });

        const createdProduct = await Products.findByPk(newProduct.id_product, {
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ]
        });

        return res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = create;