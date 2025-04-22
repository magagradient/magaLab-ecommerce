const { Authors, BlogPosts } = require("../database/indexModels");
const { Op } = require("sequelize");

// GET /authors
const index = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const authors = await Authors.findAndCountAll({
            limit,
            offset,
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        if (authors.count > 0) {
            return res.status(200).json({
                results: authors.rows,
                total: authors.count,
                limit,
                offset,
                status: "success",
                source: "authors",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({ error: "No se encontraron autores para listar." });
    } catch (error) {
        console.error("Error al obtener autores:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// GET /authors/search/:query
const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
        }

        const authors = await Authors.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { bio: { [Op.like]: `%${query}%` } }
                ]
            },
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        if (authors.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results: authors,
            total: authors.length,
            status: "success",
            source: "authors_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// GET /authors/:id
const show = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Authors.findByPk(id, {
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado." });
        }

        return res.status(200).json({
            data: author,
            status: "success",
            source: "authors_show",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener el autor:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// POST /authors
const store = async (req, res) => {
    try {
        const { name, bio } = req.body;

        if (!name || !bio) {
            return res.status(400).json({ error: "Faltan datos requeridos: name y bio." });
        }

        const newAuthor = await Authors.create({ name, bio });

        const fullAuthor = await Authors.findByPk(newAuthor.id_author, {
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        return res.status(201).json({
            status: "created",
            data: fullAuthor,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear el autor:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// PUT /authors/:id
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bio } = req.body;

        const author = await Authors.findByPk(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado." });
        }

        author.name = name || author.name;
        author.bio = bio || author.bio;
        await author.save();

        const updatedAuthor = await Authors.findByPk(id, {
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        return res.status(200).json({
            status: "updated",
            data: updatedAuthor,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar el autor:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

// DELETE /authors/:id
const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const author = await Authors.findByPk(id, {
            include: {
                model: BlogPosts,
                as: "posts",
                attributes: ["id_post", "title", "content", "created_at"]
            }
        });

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado." });
        }

        await author.destroy();

        return res.status(200).json({
            message: "Autor eliminado correctamente.",
            deleted: author,
            status: "deleted",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar el autor:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = { index, search, show, store, update, destroy };
