const {
    Products,
    Categories,
    Series,
    Keywords,
    Styles,
    Colors,
    Themes
} = require("../../../database/indexModels");


const show = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" },
                { model: Keywords, as: "keywords", through: { attributes: [] } },
                { model: Styles, as: "styles", through: { attributes: [] } },
                { model: Colors, as: "colors", through: { attributes: [] } },
                { model: Themes, as: "themes", through: { attributes: [] } }
            ]
        });

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado.",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            status: "success",
            product,
            source: "products/:id",
            message: "Producto encontrado.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = show;
