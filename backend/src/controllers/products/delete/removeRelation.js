const { Products } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const relationMap = {
    keyword: {
        model: require("../../../database/indexModels").Keywords,
        alias: "keywords",
        idField: "id_keyword",
        removeMethod: "removeKeyword"
    },
    style: {
        model: require("../../../database/indexModels").Styles,
        alias: "styles",
        idField: "id_style",
        removeMethod: "removeStyle"
    },
    color: {
        model: require("../../../database/indexModels").Colors,
        alias: "colors",
        idField: "id_color",
        removeMethod: "removeColor"
    },
    theme: {
        model: require("../../../database/indexModels").Themes,
        alias: "themes",
        idField: "id_theme",
        removeMethod: "removeTheme"
    }
};

const removeRelation = async (req, res) => {
    // ✅ Validación con Joi
    const { error } = deleteRelationSchema.validate(req.params);
    if (error) return errorResponse(res, 400, error.details[0].message);

    const { idProduct, relationType, relationId } = req.params;

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

        const methodName = relation.removeMethod;
        if (typeof product[methodName] !== "function") {
            return errorResponse(res, 500, `Método '${methodName}' no encontrado en la instancia del producto.`);
        }

        await product[methodName](relationId);

        return successResponse(res, `Relación '${relation.alias}' con ID '${relationId}' eliminada correctamente.`, {
            productId: idProduct,
            removedRelation: {
                type: relation.alias,
                id: relationId
            }
        });

    } catch (err) {
        console.error("Error al eliminar la relación:", err);
        return errorResponse(res, 500, `Error al eliminar la relación '${relationType}'.`, err.message);
    }
};

module.exports = removeRelation;
