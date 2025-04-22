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

const removeRelation = async (req, res) => {
    const { idProduct, relationType, relationId } = req.params;

    try {
        const relation = relationMap[relationType];

        if (!relation) {
            return res.status(400).json({
                message: `Tipo de relación '${relationType}' no es válido.`,
                validRelations: Object.keys(relationMap),
                timestamp: new Date()
            });
        }

        const product = await Products.findByPk(idProduct);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado.',
                timestamp: new Date()
            });
        }

        const item = await relation.model.findByPk(relationId);

        if (!item) {
            return res.status(404).json({
                message: `Elemento con ID '${relationId}' no encontrado en '${relationType}'.`,
                timestamp: new Date()
            });
        }

        await product[`remove${capitalize(relation.alias)}`](relationId);

        const updatedProduct = await Products.findByPk(idProduct, {
            include: [relation.alias]
        });

        return res.status(200).json({
            message: `Relación '${relation.alias}' con ID '${relationId}' eliminada correctamente.`,
            data: updatedProduct,
            timestamp: new Date()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error al eliminar la relación '${relationType}'.`,
            error: error.message,
            timestamp: new Date()
        });
    }
};

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = removeRelation;
