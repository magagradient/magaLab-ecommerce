const { Orders, Users } = require("../database/indexModels");
const { Op } = require("sequelize");

// Obtener todas las órdenes
const index = async (req, res) => {
    try {
        const allOrders = await Orders.findAll({
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        if (allOrders.length > 0) {
            return res.status(200).json({
                results: allOrders,
                total: allOrders.length,
                status: "success",
                source: "orders",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({ error: "No se encontraron órdenes para listar." });
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Buscar órdenes por estado
const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
        }

        const orders = await Orders.findAll({
            where: {
                status: {
                    [Op.like]: `%${query}%`
                }
            },
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        if (orders.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results: orders,
            total: orders.length,
            status: "success",
            source: "orders_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en la búsqueda de órdenes:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Obtener una orden por ID
const show = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id, {
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada." });
        }

        return res.status(200).json({
            result: order,
            status: "success",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Crear una nueva orden
const create = async (req, res) => {
    try {
        const { id_user, total, status } = req.body;

        if (!id_user || !total) {
            return res.status(400).json({ error: "Los campos id_user y total son obligatorios." });
        }

        const newOrder = await Orders.create({
            id_user,
            total,
            status: status || "pending"
        });

        const result = await Orders.findByPk(newOrder.id_order, {
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        return res.status(201).json({
            result,
            status: "success",
            message: "Orden creada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Actualizar una orden
const update = async (req, res) => {
    try {
        const { id_user, total, status } = req.body;
        const order = await Orders.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada." });
        }

        if (id_user) order.id_user = id_user;
        if (total) order.total = total;
        if (status) order.status = status;

        await order.save();

        const result = await Orders.findByPk(order.id_order, {
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        return res.status(200).json({
            result,
            status: "success",
            message: "Orden actualizada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// Eliminar una orden
const destroy = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id, {
            include: {
                model: Users,
                as: "user",
                attributes: ["id_user", "name", "email"]
            }
        });

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada." });
        }

        await order.destroy();

        return res.status(200).json({
            result: order,
            status: "success",
            message: "Orden eliminada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = { index, search, show, create, update, destroy };
