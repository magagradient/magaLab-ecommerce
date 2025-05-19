const { Products } = require("../../../database/indexModels");
const {
    Tags,
    Styles,
    Colors,
    Themes,
    Keywords,
} = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const relationMap = {
    tags: {
        model: Tags,
        alias: "tags",
        idField: "id_tag",
    },
    styles: {
        model: Styles,
        alias: "styles",
        idField: "id_style",
    },
    colors: {
        model: Colors,
        alias: "colors",
        idField: "id_color",
    },
    themes: {
        model: Themes,
        alias: "themes",
        idField: "id_theme",
    },
    keywords: {
        model: Keywords,
        alias: "keywords",
        idField: "id_keyword",
    },
};

const assignRelation = async (req, res) => {
    const { idProduct, relationType } = req.params;
    const { ids } = req.body;

    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return errorResponse(res, "bad_request", "Se requiere un array de IDs para asignar.", "products/assignRelation", 400);
        }

        const relation = relationMap[relationType];
        if (!relation) {
            return errorResponse(res, "bad_request", `Tipo de relación '${relationType}' no es válido.`, "products/assignRelation", 400, {
                validRelations: Object.keys(relationMap),
            });
        }

        const product = await Products.findByPk(idProduct);
        if (!product) {
            return errorResponse(res, "not_found", "Producto no encontrado.", "products/assignRelation", 404);
        }

        const items = await relation.model.findAll({
            where: {
                [relation.idField]: ids,
            },
        });

        if (items.length !== ids.length) {
            return errorResponse(res, "bad_request", "Uno o más IDs proporcionados no son válidos.", "products/assignRelation", 400);
        }

        await product[`set${capitalize(relation.alias)}`](items);

        const updatedProduct = await Products.findByPk(idProduct, {
            include: [relation.alias],
        });

        return successResponse(res, updatedProduct, "products/assignRelation", `Relación '${relation.alias}' asignada correctamente.`);
    } catch (error) {
        console.error(error);
        return errorResponse(res, "server_error", `Error al asignar relación '${relationType}' al producto.`, "products/assignRelation", 500, { error: error.message });
    }
};

module.exports = assignRelation;
