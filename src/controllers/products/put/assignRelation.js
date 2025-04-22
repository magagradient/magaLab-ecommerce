const { Products } = require("../../../database/indexModels");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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

const assignRelation = async (req, res) => {
    const { idProduct, relationType } = req.params;
    const { ids } = req.body;

    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                message: 'Se requiere un array de IDs para asignar.',
                timestamp: new Date()
            });
        }

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

        // verificación más precisa de los elementos relacionados
        const items = await relation.model.findAll({
            where: {
                [relation.idField]: ids
            }
        });

        if (items.length !== ids.length) {
            return res.status(400).json({
                message: 'Uno o más IDs proporcionados no son válidos.',
                timestamp: new Date()
            });
        }

        // establecer las relaciones en el producto usando los modelos completos
        await product[`set${capitalize(relation.alias)}`](items);

        // obtener el producto actualizado con las relaciones asignadas
        const updatedProduct = await Products.findByPk(idProduct, {
            include: [relation.alias]
        });

        return res.status(200).json({
            message: `Relación '${relation.alias}' asignada correctamente.`,
            data: updatedProduct,
            timestamp: new Date()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error al asignar relación '${relationType}' al producto.`,
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = assignRelation;

