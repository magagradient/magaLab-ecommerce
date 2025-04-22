const { ShoppingCarts } = require("../database/indexModels");

// Obtener todos los carritos
const index = async (req, res) => {
    try {
        const carts = await ShoppingCarts.findAll();

        if (carts.length === 0) {
            return res.status(404).json({ error: "No hay carritos registrados." });
        }

        return res.status(200).json({
            results: carts,
            total: carts.length,
            status: "success",
            source: "shopping_carts",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Obtener un carrito por ID
const show = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Crear un nuevo carrito
const create = async (req, res) => {
    try {
        const { id_user, created_at } = req.body;

        if (!id_user) {
            return res.status(400).json({ error: "El campo 'id_user' es obligatorio." });
        }

        const newCart = await ShoppingCarts.create({
            id_user,
            created_at
        });

        return res.status(201).json(newCart);
    } catch (error) {
        console.error("Error al crear carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Actualizar carrito
const update = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        const { id_user, created_at } = req.body;

        cart.id_user = id_user ?? cart.id_user;
        cart.created_at = created_at ?? cart.created_at;

        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Eliminar carrito
const destroy = async (req, res) => {
    try {
        const cart = await ShoppingCarts.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        await cart.destroy();

        return res.status(200).json({
            message: "Carrito eliminado correctamente.",
            deleted: cart
        });
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
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
