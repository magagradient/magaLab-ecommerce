const { ProductColors, Products, Colors } = require("../database/indexModels");

// Obtener todos los registros ProductColors
const index = async (req, res) => {
    try {
        const productColors = await ProductColors.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Colors, as: "color" }
            ]
        });

        return res.status(200).json({
            total: productColors.length,
            timestamp: new Date(),
            data: productColors,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener las asociaciones producto-color",
            description: error.message,
        });
    }
};

// Obtener un registro por clave compuesta
const show = async (req, res) => {
    const { id_product, id_color } = req.params;

    try {
        const productColor = await ProductColors.findOne({
            where: { id_product, id_color },
            include: [
                { model: Products, as: "product" },
                { model: Colors, as: "color" }
            ]
        });

        if (!productColor) {
            return res.status(404).json({
                error: "Asociación no encontrada",
                description: `No existe una asociación con id_product=${id_product} y id_color=${id_color}`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data: productColor,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al buscar la asociación producto-color",
            description: error.message,
        });
    }
};

// Crear una nueva asociación
const create = async (req, res) => {
    const { id_product, id_color } = req.body;

    if (!id_product || !id_color) {
        return res.status(400).json({
            error: "Faltan campos requeridos",
            description: "Se necesitan id_product e id_color.",
        });
    }

    try {
        const newProductColor = await ProductColors.create({ id_product, id_color });

        const fullData = await ProductColors.findOne({
            where: { id_product, id_color },
            include: [
                { model: Products, as: "product" },
                { model: Colors, as: "color" }
            ]
        });

        return res.status(201).json({
            message: "Asociación producto-color creada correctamente",
            timestamp: new Date(),
            data: fullData,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear la asociación producto-color",
            description: error.message,
        });
    }
};

// Eliminar una asociación
const destroy = async (req, res) => {
    const { id_product, id_color } = req.params;

    try {
        const productColor = await ProductColors.findOne({
            where: { id_product, id_color },
            include: [
                { model: Products, as: "product" },
                { model: Colors, as: "color" }
            ]
        });

        if (!productColor) {
            return res.status(404).json({
                error: "Asociación no encontrada",
                description: `No existe una asociación con id_product=${id_product} y id_color=${id_color}`,
            });
        }

        await ProductColors.destroy({ where: { id_product, id_color } });

        return res.status(200).json({
            message: "Asociación producto-color eliminada correctamente",
            timestamp: new Date(),
            data: productColor,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar la asociación producto-color",
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
