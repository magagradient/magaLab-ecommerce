const { Categories, Series } = require('../database/indexModels');
const { errorResponse } = require('../utils/responseHelper');

const validateCategoryAndSeriesExist = async (req, res, next) => {
    try {
        const { id_category, id_series } = req.body;

        // Validar categoría
        const categoryExists = await Categories.findByPk(id_category);
        if (!categoryExists) {
            return errorResponse(res, 'bad_request', `La categoría con id ${id_category} no existe.`, 'products/create', 400);
        }

        // Validar serie (si viene)
        if (id_series !== undefined && id_series !== null) {
            const seriesExists = await Series.findByPk(id_series);
            if (!seriesExists) {
                return errorResponse(res, 'bad_request', `La serie con id ${id_series} no existe.`, 'products/create', 400);
            }
        }

        next();
    } catch (error) {
        console.error('Error en validación de categoría/serie:', error);
        return errorResponse(res, 'server_error', 'Error interno del servidor', 'products/create', 500);
    }
};

module.exports = validateCategoryAndSeriesExist;
