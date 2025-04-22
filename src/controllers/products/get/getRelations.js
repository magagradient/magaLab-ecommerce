const { Products, Keywords, Styles, Colors, Themes, Series, ProductImages, Categories } = require("../../../database/indexModels");

const getRelations = async (req, res) => {
    const { id } = req.params;

    try {

        const product = await Products.findByPk(id, {
            include: [
                { model: Keywords, as: "keywords" },
                { model: Styles, as: "styles" },
                { model: Colors, as: "colors" },
                { model: Themes, as: "themes" },
                { model: Series, as: "series" },
                { model: ProductImages, as: "images" },
                { model: Categories, as: "category" }
            ]
        });

        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado.",
                timestamp: new Date()
            });
        }

        return res.status(200).json({
            message: "Relaciones del producto obtenidas correctamente.",
            data: {
                id: product.id_product,
                titulo: product.title || product.titulo || null,
                keywords: product.keywords,
                styles: product.styles,
                colors: product.colors,
                themes: product.themes,
                series: product.series,
                images: product.images,
                category: product.category
            },
            timestamp: new Date()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener relaciones del producto.",
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = getRelations;
