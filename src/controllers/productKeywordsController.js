const { ProductKeywords, Products, Keywords } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const data = await ProductKeywords.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Keywords, as: "keyword" }
            ]
        });

        return res.status(200).json({
            total: data.length,
            timestamp: new Date(),
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener los product_keywords",
            description: error.message,
        });
    }
};

const show = async (req, res) => {
    const { id_product, id_keyword } = req.params;

    try {
        const data = await ProductKeywords.findOne({
            where: { id_product, id_keyword },
            include: [
                { model: Products, as: "product" },
                { model: Keywords, as: "keyword" }
            ]
        });

        if (!data) {
            return res.status(404).json({
                error: "Relación no encontrada",
                description: `No existe relación producto-palabra clave con esos IDs`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

const create = async (req, res) => {
    const { id_product, id_keyword } = req.body;

    if (!id_product || !id_keyword) {
        return res.status(400).json({
            error: "Faltan campos obligatorios: id_product e id_keyword",
        });
    }

    try {
        const newRelation = await ProductKeywords.create({ id_product, id_keyword });

        return res.status(201).json({
            message: "Relación producto-palabra clave creada correctamente",
            timestamp: new Date(),
            data: newRelation,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear la relación",
            description: error.message,
        });
    }
};


const destroy = async (req, res) => {
    const { id_product, id_keyword } = req.params;

    try {
        const relation = await ProductKeywords.findOne({
            where: { id_product, id_keyword },
            include: [
                { model: Products, as: "product" },
                { model: Keywords, as: "keyword" }
            ]
        });

        if (!relation) {
            return res.status(404).json({
                error: "Relación no encontrada",
                description: `No existe relación con esos IDs`,
            });
        }

        await relation.destroy();

        return res.status(200).json({
            message: "Relación eliminada correctamente",
            timestamp: new Date(),
            data: relation,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar la relación",
            description: error.message,
        });
    }
};

module.exports = {
    index,
    show,
    create,
    destroy,
};
