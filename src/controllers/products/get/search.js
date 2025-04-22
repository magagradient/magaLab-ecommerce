const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { Op, fn, col, where } = require("sequelize");

const search = async (req, res) => {
    const { term } = req.query;

    if (!term || term.trim() === "") {
        return res.status(400).json({
            message: "Se requiere un término de búsqueda.",
            timestamp: new Date()
        });
    }

    const searchTerm = term.toLowerCase();

    try {
        // primero busca por título y descripción
        const products = await Products.findAll({
            where: {
                [Op.or]: [
                    where(fn("LOWER", col("Products.title")), {
                        [Op.like]: `%${searchTerm}%`
                    }),
                    where(fn("LOWER", col("Products.description")), {
                        [Op.like]: `%${searchTerm}%`
                    })
                ]
            },
            attributes: {
                exclude: ["created_at", "updated_at", "createdAt", "updatedAt"]
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

        // después filtra en memoria por relaciones
        const extendedResults = products.filter(product => {
            const fields = [
                product.category?.name,
                product.series?.title,
                ...product.keywords.map(k => k.name),
                ...product.styles.map(s => s.name),
                ...product.colors.map(c => c.name),
                ...product.themes.map(t => t.name)
            ];
            return fields.some(f => f?.toLowerCase().includes(searchTerm));
        });

        // evitar duplicados
        const totalResults = [
            ...products,
            ...extendedResults.filter(r => !products.includes(r))
        ];

        return res.status(200).json({
            message: "Resultados de la búsqueda.",
            results: totalResults,
            total: totalResults.length,
            timestamp: new Date()
        });

    } catch (error) {
        console.error("Error en búsqueda:", error);
        return res.status(500).json({
            message: "Error al realizar la búsqueda.",
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = search;
