const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");

const index = async (req, res) => {
    try {
        const products = await Products.findAll({
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" },
                { model: Keywords, as: "keywords", through: { attributes: [] } },
                { model: Colors, as: "colors", through: { attributes: [] } },
                { model: Styles, as: "styles", through: { attributes: [] } },
                { model: Themes, as: "themes", through: { attributes: [] } }
            ],
            order: [["createdAt", "DESC"]]
        });

        const productsData = products.map(product => product.get({ plain: true }));

        // DEBUG: mostrar asociaciones de Products.
        // console.log("Asociaciones de Products:", Products.associations);

        if (productsData.length === 0) {
            return res.status(404).json({ error: "No hay productos disponibles." });
        }

        const timestamp = new Date().toISOString();

        return res.status(200).json({
            status: "success",
            data: productsData,
            total: productsData.length,
            source: "products",
            timestamp
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = index;
