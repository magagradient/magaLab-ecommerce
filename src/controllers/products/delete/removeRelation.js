const { Products } = require("../../../database/indexModels");

const relationMap = {
    tags: {
        model: require("../../../database/indexModels").Tags,
        alias: "tags",
        idField: "id_tag"
    },
    styles: {
        model: require("../../../database/indexModels").Styles,
        alias: "styles",
        idField: "id_style"
    },
    colors: {
        model: require("../../../database/indexModels").Colors,
        alias: "colors",
        idField: "id_color"
    },
    themes: {
        model: require("../../../database/indexModels").Themes,
        alias: "themes",
        idField: "id_theme"
    },
    keywords: {
        model: require("../../../database/indexModels").Keywords,
        alias: "keywords",
        idField: "id_keyword"
    }
};

// Función helper para respuestas uniformes
const successResponse = (res, message, data = null) => {
    return res.status(200).json({
        status: "success",
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

const errorResponse = (res, statusCode, message, error = null) => {
    const response = {
        status: "error",
        message,
        timestamp: new Date().toISOString()
    };
    if (error) response.error = error;
    return res.status(statusCode).json(response);
};

const removeRelation = async (req, res) => {
    const { idProduct, relationType, relationId } = req.params;

    // Validar que los IDs sean números válidos
    if (isNaN(idProduct) || isNaN(relationId)) {
        return errorResponse(res, 400, "IDs inválidos. Deben ser números.");
    }

    try {
        const relation = relationMap[relationType];

        if (!relation) {
            return errorResponse(res, 400, `Tipo de relación '${relationType}' no es válido.`, {
                validRelations: Object.keys(relationMap)
            });
        }

        const product = await Products.findByPk(idProduct);

        if (!product) {
            return errorResponse(res, 404, "Producto no encontrado.");
        }

        const item = await relation.model.findByPk(relationId);

        if (!item) {
            return errorResponse(res, 404, `Elemento con ID '${relationId}' no encontrado en '${relationType}'.`);
        }

        // Validar que el método para remover exista en la instancia
        const methodName = `remove${capitalize(relation.alias)}`;
        if (typeof product[methodName] !== "function") {
            return errorResponse(res, 500, `No se puede eliminar la relación '${relationType}' porque el método '${methodName}' no existe.`);
        }

        await product[methodName](relationId);

        return successResponse(res, `Relación '${relation.alias}' con ID '${relationId}' eliminada correctamente.`, {
            productId: idProduct,
            removedRelation: {
                type: relation.alias,
                id: relationId
            }
        });

    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, `Error al eliminar la relación '${relationType}'.`, error.message);
    }
};

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = removeRelation;
