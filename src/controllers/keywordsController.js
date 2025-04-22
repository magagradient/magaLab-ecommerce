const { Keywords } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const allKeywords = await Keywords.findAll();

        if (allKeywords.length > 0) {
            return res.status(200).json({
                results: allKeywords,
                total: allKeywords.length,
                status: "success",
                source: "keywords",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({ error: "No se encontraron keywords para listar." });
    } catch (error) {
        console.error("Error al obtener keywords:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
        }

        const results = await Keywords.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        if (results.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "keywords_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en la búsqueda de keywords:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const show = async (req, res) => {
    try {
        const keyword = await Keywords.findByPk(req.params.id);

        if (!keyword) {
            return res.status(404).json({ error: "Keyword no encontrada." });
        }

        return res.status(200).json({
            result: keyword,
            status: "success",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener la keyword:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "El campo 'name' es obligatorio y debe ser un string." });
        }

        const existing = await Keywords.findOne({ where: { name } });

        if (existing) {
            return res.status(409).json({ error: "Ya existe una keyword con ese nombre." });
        }

        const newKeyword = await Keywords.create({ name });

        return res.status(201).json({
            result: newKeyword,
            status: "success",
            message: "Keyword creada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear la keyword:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { name } = req.body;
        const keyword = await Keywords.findByPk(req.params.id);

        if (!keyword) {
            return res.status(404).json({ error: "Keyword no encontrada." });
        }

        if (name) {
            // evita duplicados al actualizar
            const duplicate = await Keywords.findOne({
                where: {
                    name,
                    id_keyword: { [Op.ne]: keyword.id_keyword }
                }
            });

            if (duplicate) {
                return res.status(409).json({ error: "Ya existe otra keyword con ese nombre." });
            }

            keyword.name = name;
        }

        await keyword.save();

        return res.status(200).json({
            result: keyword,
            status: "success",
            message: "Keyword actualizada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar la keyword:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const keyword = await Keywords.findByPk(req.params.id);

        if (!keyword) {
            return res.status(404).json({ error: "Keyword no encontrada." });
        }

        await keyword.destroy();

        return res.status(200).json({
            result: keyword,
            status: "success",
            message: "Keyword eliminada correctamente.",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar la keyword:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = { index, search, show, create, update, destroy };
