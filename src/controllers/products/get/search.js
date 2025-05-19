const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { Op, fn, col, where } = require("sequelize");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const search = async (req, res) => {
    const { term } = req.query;

    if (!term || term.trim() === "") {
        return errorResponse(
            res,
            "bad_request",
            "Se requiere un término de búsqueda.",
            "products_search",
            400
        );
    }

    const searchTerm = term.toLowerCase();

    try {
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

        const totalResults = [
            ...products,
            ...extendedResults.filter(r => !products.includes(r))
        ];

        return successResponse(res, {
            results: totalResults,
            total: totalResults.length
        }, "products_search");

    } catch (error) {
        console.error("🔴 Error en búsqueda:", error);
        return errorResponse(
            res,
            "server_error",
            "Error al realizar la búsqueda.",
            "products_search",
            500
        );
    }
};

module.exports = search;
