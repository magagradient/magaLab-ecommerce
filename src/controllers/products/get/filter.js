const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { Op } = require("sequelize");
const responseHelper = require("../../../utils/responseHelper");

const filter = async (req, res) => {
    try {
        const {
            title,
            description,
            keyword,
            category,
            series,
            style,
            color,
            theme,
            price_min,
            price_max,
            is_sold
        } = req.query;

        const where = {};
        const include = [];

        // Búsqueda por texto
        if (title || description) {
            where[Op.or] = [];

            if (title) {
                where[Op.or].push({ title: { [Op.like]: `%${title}%` } });
            }

            if (description) {
                where[Op.or].push({ description: { [Op.like]: `%${description}%` } });
            }
        }

        // Filtros simples
        if (price_min || price_max) {
            where.price = {};
            if (price_min) where.price[Op.gte] = price_min;
            if (price_max) where.price[Op.lte] = price_max;
        }

        if (is_sold !== undefined) {
            where.is_sold = is_sold === 'true';
        }

        // Relaciones condicionales
        const dynamicInclude = [
            {
                model: Categories,
                as: 'category',
                required: !!category,
                where: category ? { name: { [Op.like]: `%${category}%` } } : undefined
            },
            {
                model: Series,
                as: 'series',
                required: !!series,
                where: series ? { title: { [Op.like]: `%${series}%` } } : undefined
            },
            {
                model: Keywords,
                as: 'keywords',
                through: { attributes: [] },
                required: !!keyword,
                where: keyword ? { name: { [Op.like]: `%${keyword}%` } } : undefined
            },
            {
                model: Styles,
                as: 'styles',
                through: { attributes: [] },
                required: !!style,
                where: style ? { name: { [Op.like]: `%${style}%` } } : undefined
            },
            {
                model: Colors,
                as: 'colors',
                through: { attributes: [] },
                required: !!color,
                where: color ? { name: { [Op.like]: `%${color}%` } } : undefined
            },
            {
                model: Themes,
                as: 'themes',
                through: { attributes: [] },
                required: !!theme,
                where: theme ? { name: { [Op.like]: `%${theme}%` } } : undefined
            }
        ];

        include.push(...dynamicInclude);

        const products = await Products.findAll({
            where,
            include,
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        });

        return responseHelper.successResponse(
            res,
            products,
            "products_filter"
        );

    } catch (error) {
        console.error("🔴 Error en filtro de productos:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            "Error al filtrar productos.",
            "products_filter",
            500
        );
    }
};

module.exports = filter;
