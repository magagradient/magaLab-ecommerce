const { Products, Keywords, Styles, Colors, Themes, Series, Categories } = require("../../../database/indexModels");
const { Op } = require("sequelize");

const related = async (req, res) => {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const currentProduct = await Products.findByPk(id, {
            include: ["keywords", "styles", "colors", "themes", "series", "category"]
        });

        if (!currentProduct) {
            return res.status(404).json({
                message: "Producto no encontrado.",
                timestamp: new Date()
            });
        }

        // Obtener IDs de asociaciones del producto actual
        const keywordIds = currentProduct.keywords.map(k => k.id_keyword);
        const styleIds = currentProduct.styles.map(s => s.id_style);
        const colorIds = currentProduct.colors.map(c => c.id_color);
        const themeIds = currentProduct.themes.map(t => t.id_theme);

        const relatedProducts = await Products.findAll({
            where: {
                id_product: { [Op.ne]: currentProduct.id_product },
                [Op.or]: [
                    { id_series: currentProduct.id_series },
                    { id_category: currentProduct.id_category },
                ]
            },
            include: [
                {
                    model: Keywords,
                    as: "keywords",
                    through: { attributes: [] },
                    where: keywordIds.length > 0 ? { id_keyword: { [Op.in]: keywordIds } } : undefined,
                    required: false
                },
                {
                    model: Styles,
                    as: "styles",
                    through: { attributes: [] },
                    where: styleIds.length > 0 ? { id_style: { [Op.in]: styleIds } } : undefined,
                    required: false
                },
                {
                    model: Colors,
                    as: "colors",
                    through: { attributes: [] },
                    where: colorIds.length > 0 ? { id_color: { [Op.in]: colorIds } } : undefined,
                    required: false
                },
                {
                    model: Themes,
                    as: "themes",
                    through: { attributes: [] },
                    where: themeIds.length > 0 ? { id_theme: { [Op.in]: themeIds } } : undefined,
                    required: false
                },
                { model: Series, as: "series" },
                { model: Categories, as: "category" }
            ],
            order: [["createdAt", "DESC"]],
            limit
        });

        return res.status(200).json({
            message: "Productos relacionados obtenidos correctamente.",
            data: relatedProducts,
            total: relatedProducts.length,
            timestamp: new Date()
        });

    } catch (error) {
        console.error("Error en obtener relacionados:", error);
        return res.status(500).json({
            message: "Error al obtener productos relacionados.",
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = related;
