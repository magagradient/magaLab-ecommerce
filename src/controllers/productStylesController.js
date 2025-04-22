const { ProductStyles, Products, Styles } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const productStyles = await ProductStyles.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Styles, as: "style" }
            ]
        });

        return res.status(200).json({
            total: productStyles.length,
            timestamp: new Date(),
            data: productStyles
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: "Parámetro inválido",
                description: "El ID debe ser un número válido.",
            });
        }

        const relation = await ProductStyles.findOne({
            where: { id_product: id },
            include: [
                { model: Products, as: "product" },
                { model: Styles, as: "style" },
            ],
        });

        if (!relation) {
            return res.status(404).json({
                error: "No encontrado",
                description: `No se encontró ninguna relación con id_product ${id}.`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data: relation,
        });
    } catch (error) {
        console.error("Error en show de ProductStyle:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

const create = async (req, res) => {
    const { id_product, id_style } = req.body;

    if (!id_product || !id_style) {
        return res.status(400).json({
            error: "Campos obligatorios faltantes",
            description: "Se requiere id_product e id_style"
        });
    }

    try {
        const created = await ProductStyles.create({ id_product, id_style });

        const fullData = await ProductStyles.findOne({
            where: { id_product, id_style },
            include: [
                { model: Products, as: "product" },
                { model: Styles, as: "style" }
            ]
        });

        return res.status(201).json({
            message: "Relación creada correctamente",
            timestamp: new Date(),
            data: fullData
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno al crear la relación",
            description: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { id_product, id_style } = req.params;
        const { id_style: new_id_style } = req.body;

        if (!id_product || !id_style) {
            return res.status(400).json({
                error: "Parámetros incompletos",
                description: "Se requieren 'id_product' e 'id_style' en la URL"
            });
        }

        const relation = await ProductStyles.findOne({
            where: { id_product, id_style }
        });

        if (!relation) {
            return res.status(404).json({
                error: "No encontrado",
                description: "No se encontró la relación especificada"
            });
        }

        // Si querés cambiar el estilo relacionado
        if (new_id_style) {
            relation.id_style = new_id_style;
        }

        await relation.save();

        const updatedRelation = await ProductStyles.findOne({
            where: {
                id_product: relation.id_product,
                id_style: relation.id_style
            },
            include: [
                { model: Products, as: "product" },
                { model: Styles, as: "style" }
            ]
        });

        return res.status(200).json({
            message: "Relación actualizada exitosamente",
            data: updatedRelation
        });

    } catch (error) {
        console.error("Error en update de ProductStyles:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const destroy = async (req, res) => {
    const { id_product, id_style } = req.params;

    try {
        const relation = await ProductStyles.findOne({
            where: { id_product, id_style },
            include: [
                { model: Products, as: "product" },
                { model: Styles, as: "style" }
            ]
        });

        if (!relation) {
            return res.status(404).json({
                error: "Relación no encontrada",
                description: `No se encontró la relación con producto ${id_product} y estilo ${id_style}`
            });
        }

        await ProductStyles.destroy({ where: { id_product, id_style } });

        return res.status(200).json({
            message: "Relación eliminada",
            timestamp: new Date(),
            data: relation
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno al eliminar la relación",
            description: error.message
        });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
