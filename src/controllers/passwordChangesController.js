const { PasswordChanges, Users } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const allChanges = await PasswordChanges.findAll({
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (allChanges.length > 0) {
            return res.status(200).json({
                results: allChanges,
                total: allChanges.length,
                status: "success",
                source: "password_changes",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(404).json({ error: "No se encontraron registros." });
    } catch (error) {
        console.error("Error al obtener cambios de contraseña:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) return res.status(400).json({ error: "Falta término de búsqueda." });

        const results = await PasswordChanges.findAll({
            where: {
                ip_address: { [Op.like]: `%${query}%` },
            },
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (results.length === 0) return res.status(404).json({ error: "No se encontraron resultados." });

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "password_changes_search",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error en la búsqueda por IP:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const change = await PasswordChanges.findByPk(req.params.id, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (!change) return res.status(404).json({ error: "Registro no encontrado." });

        return res.status(200).json(change);
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_user, change_date, ip_address } = req.body;

        if (!id_user || !change_date || !ip_address) {
            return res.status(400).json({ error: "Los campos id_user, change_date e ip_address son obligatorios." });
        }

        const newChange = await PasswordChanges.create({ id_user, change_date, ip_address });

        const result = await PasswordChanges.findByPk(newChange.id_change, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const change = await PasswordChanges.findByPk(req.params.id);

        if (!change) return res.status(404).json({ error: "Registro no encontrado." });

        const { change_date, ip_address } = req.body;

        if (change_date) change.change_date = change_date;
        if (ip_address) change.ip_address = ip_address;

        await change.save();

        const result = await PasswordChanges.findByPk(req.params.id, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const change = await PasswordChanges.findByPk(req.params.id, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (!change) return res.status(404).json({ error: "Registro no encontrado." });

        await change.destroy();

        return res.status(200).json({
            message: "Registro eliminado correctamente.",
            deleted: change,
        });
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
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
