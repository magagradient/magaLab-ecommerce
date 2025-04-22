const { CartItems } = require("../database/indexModels");


const index = async (req, res) => {
    try {
        const items = await CartItems.findAll();

        if (items.length === 0) {
            return res.status(404).json({ error: "No hay ítems en el carrito." });
        }

        return res.status(200).json({
            results: items,
            total: items.length,
            status: "success",
            source: "cart_items",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener ítems del carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error al obtener ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_cart, id_product, quantity } = req.body;

        if (!id_cart || !id_product) {
            return res.status(400).json({ error: "Los campos 'id_cart' y 'id_product' son obligatorios." });
        }

        const newItem = await CartItems.create({
            id_cart,
            id_product,
            quantity: quantity ?? 1
        });

        return res.status(201).json(newItem);
    } catch (error) {
        console.error("Error al crear ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        const { id_cart, id_product, quantity } = req.body;

        item.id_cart = id_cart ?? item.id_cart;
        item.id_product = id_product ?? item.id_product;
        item.quantity = quantity ?? item.quantity;

        await item.save();

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error al actualizar ítem:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const item = await CartItems.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado." });
        }

        await item.destroy();

        return res.status(200).json({
            message: "Ítem eliminado correctamente.",
            deleted: item
        });
    } catch (error) {
        console.error("Error al eliminar ítem:", error);
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
