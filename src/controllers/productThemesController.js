const { ProductThemes, Products, Themes } = require("../database/indexModels");
const { Op } = require("sequelize");

// Obtener todas las relaciones
const index = async (req, res) => {
    try {
        const records = await ProductThemes.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Themes, as: "theme" }
            ]
        });

        if (records.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hay relaciones producto-tema registradas."
            });
        }

        return res.status(200).json({
            ok: true,
            data: records,
            timestamp: new Date()
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener las relaciones.",
            error: error.message
        });
    }
};

const search = async (req, res) => {
    try {
        const { q } = req.params;

        const results = await ProductThemes.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Themes, as: "theme" }
            ],
            where: {
                [Op.or]: [
                    { '$product.title$': { [Op.like]: `%${q}%` } },
                    { '$theme.name$': { [Op.like]: `%${q}%` } }
                ]
            }
        });

        res.status(200).json({
            ok: true,
            data: results,
            timestamp: new Date()
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar la relación.",
            error: error.message
        });
    }
};

// Mostrar una relación específica
const show = async (req, res) => {
    const { id_product, id_theme } = req.params;

    try {
        const relation = await ProductThemes.findOne({
            where: { id_product, id_theme },
            include: [
                { model: Products },
                { model: Themes }
            ]
        });

        if (!relation) {
            return res.status(404).json({
                ok: false,
                msg: "Relación producto-tema no encontrada."
            });
        }

        return res.status(200).json({
            ok: true,
            data: relation
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar la relación.",
            error: error.message
        });
    }
};

// Crear una relación
const create = async (req, res) => {
    const { id_product, id_theme } = req.body;

    if (!id_product || !id_theme) {
        return res.status(400).json({
            ok: false,
            msg: "Faltan campos obligatorios: id_product y/o id_theme."
        });
    }

    try {
        const product = await Products.findByPk(id_product);
        const theme = await Themes.findByPk(id_theme);

        if (!product || !theme) {
            return res.status(404).json({
                ok: false,
                msg: "Producto o Tema no encontrados."
            });
        }

        const exists = await ProductThemes.findOne({
            where: { id_product, id_theme }
        });

        if (exists) {
            return res.status(400).json({
                ok: false,
                msg: "Esta relación ya existe."
            });
        }

        await ProductThemes.create({ id_product, id_theme });

        const fullRelation = await ProductThemes.findOne({
            where: { id_product, id_theme },
            include: [
                { model: Products },
                { model: Themes }
            ]
        });

        return res.status(201).json({
            ok: true,
            msg: "Relación producto-tema creada exitosamente.",
            data: fullRelation
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al crear la relación.",
            error: error.message
        });
    }
};

// PUT /product-themes/:id_product/:id_theme
const update = async (req, res) => {
    const { id_product, id_theme } = req.params;
    const { id_theme: new_id_theme } = req.body;

    try {
        if (!id_product || !id_theme || !new_id_theme) {
            return res.status(400).json({
                ok: false,
                msg: "Se requieren id_product, id_theme (original) y nuevo id_theme en el body."
            });
        }

        const relation = await ProductThemes.findOne({
            where: { id_product, id_theme }
        });

        if (!relation) {
            return res.status(404).json({
                ok: false,
                msg: "Relación producto-tema original no encontrada."
            });
        }

        relation.id_theme = new_id_theme;
        await relation.save();

        const updated = await ProductThemes.findOne({
            where: { id_product, id_theme: new_id_theme },
            include: [
                { model: Products, as: "product" },
                { model: Themes, as: "theme" }
            ]
        });

        return res.status(200).json({
            ok: true,
            msg: "Relación producto-tema actualizada exitosamente.",
            timestamp: new Date(),
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar la relación.",
            error: error.message
        });
    }
};


// Eliminar una relación
const destroy = async (req, res) => {
    const { id_product, id_theme } = req.params;

    try {
        const relation = await ProductThemes.findOne({
            where: { id_product, id_theme },
            include: [
                { model: Products },
                { model: Themes }
            ]
        });

        if (!relation) {
            return res.status(404).json({
                ok: false,
                msg: "Relación producto-tema no encontrada."
            });
        }

        await ProductThemes.destroy({
            where: { id_product, id_theme }
        });

        return res.status(200).json({
            ok: true,
            msg: "Relación eliminada exitosamente.",
            data: relation
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar la relación.",
            error: error.message
        });
    }
};

module.exports = {
    index,
    search,
    show,
    create,
    update,
    destroy
};
