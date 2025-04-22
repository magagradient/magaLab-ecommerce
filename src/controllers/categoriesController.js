const { Categories } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const allCategories = await Categories.findAll();

        if (allCategories.length > 0) {
            return res.status(200).json({
                results: allCategories,
                total: allCategories.length,
                status: "success",
                source: "categories",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({ error: "No se encontraron categorías para listar." });
    } catch (error) {
        console.error("Error al obtener categorías:", error);
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

        const categories = await Categories.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        if (categories.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results: categories,
            total: categories.length,
            status: "success",
            source: "categories_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en la búsqueda de categorías:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const show = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error("Error al obtener la categoría:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "El nombre de la categoría es obligatorio." });
        }

        const existing = await Categories.findOne({ where: { name } });
        if (existing) {
            return res.status(409).json({ error: "Ya existe una categoría con ese nombre." });
        }

        const newCategory = await Categories.create({ name });
        const created = await Categories.findByPk(newCategory.id_category);

        return res.status(201).json(created);
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Categories.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "El nombre es obligatorio." });
        }

        const duplicate = await Categories.findOne({ where: { name } });
        if (duplicate && duplicate.id_category !== category.id_category) {
            return res.status(409).json({ error: "Ya existe otra categoría con ese nombre." });
        }

        await category.update({ name });
        const updated = await Categories.findByPk(category.id_category);

        return res.status(200).json(updated);
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        await category.destroy();

        return res.status(200).json({
            deleted: category,
            status: "deleted",
            source: "categories",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
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
