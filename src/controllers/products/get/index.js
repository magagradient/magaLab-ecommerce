const { Op } = require("sequelize");
const {
    Products,
    Categories,
    Series,
    Keywords,
    Styles,
    Colors,
    Themes,
} = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const {
            category,
            series,
            keywords,
            styles,
            colors,
            themes,
            title,
            description,
            price_min,
            price_max,
            is_sold,
            visible_in_portfolio,
            sort_by = "createdAt",
            order = "DESC",
            limit = 5,
            page = 1,
        } = req.query;

        const offset = (Number(page) - 1) * Number(limit);

        const where = {};
        if (category) where.categoryId = category;
        if (series) where.seriesId = series;
        if (title) where.title = { [Op.like]: `%${title}%` };
        if (description) where.description = { [Op.like]: `%${description}%` };
        if (price_min) where.price = { ...(where.price || {}), [Op.gte]: Number(price_min) };
        if (price_max) where.price = { ...(where.price || {}), [Op.lte]: Number(price_max) };
        if (is_sold !== undefined) where.is_sold = is_sold === "true";
        if (visible_in_portfolio !== undefined) where.visible_in_portfolio = visible_in_portfolio === "true";

        const include = [
            { model: Categories, as: "category" },
            { model: Series, as: "series" },
            {
                model: Keywords,
                as: "keywords",
                through: { attributes: [] },
                where: keywords ? { name: { [Op.like]: `%${keywords}%` } } : undefined,
                required: !!keywords,
            },
            {
                model: Colors,
                as: "colors",
                through: { attributes: [] },
                where: colors ? { name: { [Op.like]: `%${colors}%` } } : undefined,
                required: !!colors,
            },
            {
                model: Styles,
                as: "styles",
                through: { attributes: [] },
                where: styles ? { name: { [Op.like]: `%${styles}%` } } : undefined,
                required: !!styles,
            },
            {
                model: Themes,
                as: "themes",
                through: { attributes: [] },
                where: themes ? { name: { [Op.like]: `%${themes}%` } } : undefined,
                required: !!themes,
            },
        ];

        const products = await Products.findAll({
            where,
            include,
            limit: Number(limit),
            offset: Number(offset),
            order: [[sort_by, order.toUpperCase()]],
            attributes: { exclude: ["created_at", "updated_at"] },
        });

        const productsData = products.map((product) => product.get({ plain: true }));

        if (productsData.length === 0) {
            return errorResponse(res, "not_found", "No hay productos disponibles.", "products_index", 404);
        }

        return successResponse(res, productsData, "products_index");
    } catch (error) {
        console.error("🔴 Error al obtener productos:", error);
        return errorResponse(res, "server_error", "Error interno del servidor.", "products_index", 500);
    }
};

module.exports = index;
