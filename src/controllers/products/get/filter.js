const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { Op } = require("sequelize");
const responseHelper = require("../../../utils/responseHelper");

const filter = async (req, res) => {
    try {
        const {
            title,
            description,
            keywords,
            category,
            series,
            styles,
            colors,
            themes,
            price_min,
            price_max,
            is_sold,
            visible_in_portfolio,
            sort_by = 'createdAt',
            order = 'desc',
            limit = 5,
            page = 1,
        } = req.query;

        const offset = (Number(page) - 1) * Number(limit);

        const where = {};
        const include = [];

        if (title || description) {
            where[Op.or] = [];
            if (title) where[Op.or].push({ title: { [Op.like]: `%${title}%` } });
            if (description) where[Op.or].push({ description: { [Op.like]: `%${description}%` } });
        }

        if (price_min !== undefined || price_max !== undefined) {
            where.price = {};
            if (price_min !== undefined) where.price[Op.gte] = Number(price_min);
            if (price_max !== undefined) where.price[Op.lte] = Number(price_max);
        }

        if (is_sold !== undefined) where.is_sold = is_sold === 'true';
        if (visible_in_portfolio !== undefined) where.visible_in_portfolio = visible_in_portfolio === 'true';

        if (category) include.push({
            model: Categories,
            as: 'category',
            required: true,
            where: { name: { [Op.like]: `%${category}%` } }
        });

        if (series) include.push({
            model: Series,
            as: 'series',
            required: true,
            where: { title: { [Op.like]: `%${series}%` } }
        });

        if (keywords) include.push({
            model: Keywords,
            as: 'keywords',
            through: { attributes: [] },
            required: true,
            where: { name: { [Op.like]: `%${keywords}%` } }
        });

        if (styles) include.push({
            model: Styles,
            as: 'styles',
            through: { attributes: [] },
            required: true,
            where: { name: { [Op.like]: `%${styles}%` } }
        });

        if (colors) include.push({
            model: Colors,
            as: 'colors',
            through: { attributes: [] },
            required: true,
            where: { name: { [Op.like]: `%${colors}%` } }
        });

        if (themes) include.push({
            model: Themes,
            as: 'themes',
            through: { attributes: [] },
            required: true,
            where: { name: { [Op.like]: `%${themes}%` } }
        });

        const products = await Products.findAll({
            where,
            include,
            attributes: { exclude: ['created_at', 'updated_at'] },
            order: [[sort_by, order.toUpperCase()]],
            limit: Number(limit),
            offset: Number(offset)
        });

        return responseHelper.successResponse(res, products, "products_filter");

    } catch (error) {
        console.error("🔴 Error en filtro de productos:", error);
        return responseHelper.errorResponse(res, "server_error", "Error al filtrar productos.", "products_filter", 500);
    }
};

module.exports = filter;
