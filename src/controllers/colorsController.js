const { Colors } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const colors = await Colors.findAll();

        if (colors.length === 0) {
            return res.status(404).json({ error: "No se encontraron colores para listar." });
        }

        return res.status(200).json({
            results: colors,
            total: colors.length,
            status: "success",
            source: "colors",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al listar los colores:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const color = await Colors.findByPk(req.params.id);

        if (!color) {
            return res.status(404).json({ error: "Color no encontrado." });
        }

        return res.status(200).json(color);
    } catch (error) {
        console.error("Error al obtener el color:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        let { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "El nombre del color es requerido." });
        }

        name = name.trim().toLowerCase();

        const existing = await Colors.findOne({ where: { name } });
        if (existing) {
            return res.status(409).json({ error: "Ese color ya existe." });
        }

        const newColor = await Colors.create({ name });
        const created = await Colors.findByPk(newColor.id_color);

        return res.status(201).json(created);
    } catch (error) {
        console.error("Error al crear el color:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        let { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "El nombre del color es requerido." });
        }

        name = name.trim().toLowerCase();

        const color = await Colors.findByPk(id);
        if (!color) {
            return res.status(404).json({ error: "Color no encontrado." });
        }

        const duplicate = await Colors.findOne({
            where: {
                name,
                id_color: { [Op.ne]: id }
            }
        });
        if (duplicate) {
            return res.status(409).json({ error: "Ese nombre de color ya está en uso." });
        }

        await color.update({ name });
        const updated = await Colors.findByPk(id);

        return res.status(200).json(updated);
    } catch (error) {
        console.error("Error al actualizar el color:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const color = await Colors.findByPk(req.params.id);

        if (!color) {
            return res.status(404).json({ error: "Color no encontrado." });
        }

        await color.destroy();

        return res.status(200).json({
            deleted: color,
            status: "deleted",
            source: "colors",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar el color:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = { index, show, create, update, destroy };
