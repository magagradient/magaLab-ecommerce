const { OrdersProducts, Orders, Products } = require("../database/indexModels");

// Obtener todos los registros
const index = async (req, res) => {
    try {
        const allItems = await OrdersProducts.findAll({
            include: [
                { model: Orders, as: "order" },
                { model: Products, as: "product" }
            ]
        });

        if (allItems.length === 0) {
            return res.status(404).json({ error: "No hay registros de órdenes-productos." });
        }

        return res.status(200).json({
            results: allItems,
            total: allItems.length,
            status: "success",
            source: "orders_products",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener órdenes-productos:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Obtener por ID de orden y producto
const show = async (req, res) => {
    try {
        const { id_order, id_product } = req.params;

        const relation = await OrdersProducts.findOne({
            where: { id_order, id_product },
            include: [
                { model: Orders, as: "order" },   // este "as" debe coincidir con el que pusiste en el modelo
                { model: Products, as: "product" }
            ]
        });

        if (!relation) {
            return res.status(404).json({
                status: "error",
                message: "No se encontró la relación entre ese pedido y producto"
            });
        }

        res.status(200).json({
            status: "success",
            data: relation
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            description: error.message
        });
    }
};

// Crear un nuevo registro
const create = async (req, res) => {
    try {
        const { id_order, id_product, quantity, unit_price } = req.body;

        if (!id_order || !id_product || typeof unit_price !== "number") {
            return res.status(400).json({
                error: "Faltan campos obligatorios o el tipo es incorrecto."
            });
        }

        const newItem = await OrdersProducts.create({
            id_order,
            id_product,
            quantity: quantity || 1,
            unit_price
        });

        const created = await OrdersProducts.findOne({
            where: { id_order, id_product },
            include: [Orders, Products]
        });

        return res.status(201).json({
            result: created,
            status: "success",
            message: "Registro creado correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Actualizar un registro
const update = async (req, res) => {
    const { id_order, id_product } = req.params;
    const { quantity, unit_price } = req.body;

    try {
        const item = await OrdersProducts.findOne({ where: { id_order, id_product } });

        if (!item) {
            return res.status(404).json({ error: "Registro no encontrado." });
        }

        if (quantity !== undefined) item.quantity = quantity;
        if (unit_price !== undefined) item.unit_price = unit_price;

        await item.save();

        const updated = await OrdersProducts.findOne({
            where: { id_order, id_product },
            include: [Orders, Products]
        });

        return res.status(200).json({
            result: updated,
            status: "success",
            message: "Registro actualizado correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Eliminar un registro
const destroy = async (req, res) => {
    const { id_order, id_product } = req.params;
    try {
        const item = await OrdersProducts.findOne({
            where: { id_order, id_product },
            include: [Orders, Products]
        });

        if (!item) {
            return res.status(404).json({ error: "Registro no encontrado." });
        }

        await item.destroy();

        return res.status(200).json({
            result: item,
            status: "success",
            message: "Registro eliminado correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = { index,
    show,
    create,
    update,
    destroy };
