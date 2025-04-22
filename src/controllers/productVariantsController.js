const { ProductVariants } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const variants = await ProductVariants.findAll();

        if (variants.length === 0) {
            return res.status(404).json({ error: "No hay variantes de productos registradas." });
        }

        return res.status(200).json({
            results: variants,
            total: variants.length,
            status: "success",
            source: "product_variants",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener variantes:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const variant = await ProductVariants.findByPk(req.params.id);

        if (!variant) {
            return res.status(404).json({ error: "Variante no encontrada." });
        }

        return res.status(200).json(variant);
    } catch (error) {
        console.error("Error al obtener variante:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_product, name, price } = req.body;

        if (!id_product || !name || price === undefined) {
            return res.status(400).json({ error: "Faltan campos requeridos: 'id_product', 'name' y/o 'price'." });
        }

        const newVariant = await ProductVariants.create({ id_product, name, price });

        return res.status(201).json(newVariant);
    } catch (error) {
        console.error("Error al crear variante:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const variant = await ProductVariants.findByPk(req.params.id);

        if (!variant) {
            return res.status(404).json({ error: "Variante no encontrada." });
        }

        const { id_product, name, price } = req.body;

        variant.id_product = id_product ?? variant.id_product;
        variant.name = name ?? variant.name;
        variant.price = price ?? variant.price;

        await variant.save();

        return res.status(200).json(variant);
    } catch (error) {
        console.error("Error al actualizar variante:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const variant = await ProductVariants.findByPk(req.params.id);

        if (!variant) {
            return res.status(404).json({ error: "Variante no encontrada." });
        }

        await variant.destroy();

        return res.status(200).json({
            message: "Variante eliminada correctamente.",
            deleted: variant
        });
    } catch (error) {
        console.error("Error al eliminar variante:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
