const { ShoppingCarts } = require("../../../database/indexModels");

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

module.exports = create;
