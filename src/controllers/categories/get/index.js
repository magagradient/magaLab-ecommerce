const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        // Obtenemos todas las categorías ordenadas por 'name'
        const categories = await Categories.findAll({
            attributes: ['id_category', 'name'], // Especificamos los atributos que necesitamos
            order: [['name', 'ASC']], // Ordenamos las categorías por nombre
            raw: true, // Aseguramos que sea un resultado plano, sin instancias de Sequelize
        });

        // Respondemos con éxito, incluyendo el tipo de respuesta "categories_index"
        return responseHelper.successResponse(res, categories, "categories_index");

    } catch (error) {
        console.error("Error al obtener categorías:", error);

        // Si ocurre un error, respondemos con un mensaje de error
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_index",
            500
        );
    }
};

module.exports = index;
