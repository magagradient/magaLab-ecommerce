const { Series } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const series = await Series.findAll();

        if (series.length === 0) {
            return res.status(404).json({ error: "No hay series disponibles." });
        }

        return res.status(200).json({
            results: series,
            total: series.length,
            status: "success",
            source: "series",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener series:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const search = async (req, res) => {
    const { query } = req.params;

    try {
        const results = await Series.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "series",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al buscar series:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const show = async (req, res) => {
    try {
        const serie = await Series.findByPk(req.params.id);

        if (!serie) {
            return res.status(404).json({ error: "Serie no encontrada." });
        }

        return res.status(200).json(serie);
    } catch (error) {
        console.error("Error al obtener serie:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { title, description, cover_image } = req.body;

        if (!title) {
            return res.status(400).json({ error: "El campo 'title' es obligatorio." });
        }

        const newSeries = await Series.create({
            title,
            description,
            cover_image
        });

        return res.status(201).json(newSeries);
    } catch (error) {
        console.error("Error al crear serie:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { title, description, cover_image } = req.body;

        const serie = await Series.findByPk(req.params.id);

        if (!serie) {
            return res.status(404).json({ error: "Serie no encontrada." });
        }

        serie.title = title ?? serie.title;
        serie.description = description ?? serie.description;
        serie.cover_image = cover_image ?? serie.cover_image;

        await serie.save();

        return res.status(200).json(serie);
    } catch (error) {
        console.error("Error al actualizar serie:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const serie = await Series.findByPk(req.params.id);

        if (!serie) {
            return res.status(404).json({ error: "Serie no encontrada." });
        }

        await serie.destroy();

        return res.status(200).json({
            message: "Serie eliminada correctamente.",
            deleted: serie
        });
    } catch (error) {
        console.error("Error al eliminar serie:", error);
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
