const { BlogPosts, Authors } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const allBlogPosts = await BlogPosts.findAll({
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name"]
            }
        });

        if (allBlogPosts.length > 0) {
            return res.status(200).json({
                results: allBlogPosts,
                total: allBlogPosts.length,
                status: "success",
                source: "blog_posts",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({ error: "No se encontraron publicaciones para listar." });
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
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

        const posts = await BlogPosts.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } }
                ]
            },
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name"]
            }
        });

        if (posts.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results: posts,
            total: posts.length,
            status: "success",
            source: "blog_posts_search",
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

const show = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await BlogPosts.findByPk(id, {
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name", "bio", "avatar_url"]
            }
        });

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada." });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Error al obtener la publicación:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { title, content, author_id } = req.body;

        if (!title || !content || !author_id) {
            return res.status(400).json({ error: "Todos los campos son obligatorios: title, content y author_id." });
        }

        if (typeof author_id !== "number") {
            return res.status(400).json({ error: "El author_id debe ser un número válido." });
        }

        const newPost = await BlogPosts.create({ title, content, author_id });

        const createdPost = await BlogPosts.findByPk(newPost.id_post, {
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name"]
            }
        });

        return res.status(201).json({
            status: "created",
            data: createdPost,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await BlogPosts.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada." });
        }

        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;

        await post.update(updates);

        const updatedPost = await BlogPosts.findByPk(id, {
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name"]
            }
        });

        return res.status(200).json({
            status: "updated",
            data: updatedPost,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar la publicación:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await BlogPosts.findByPk(id, {
            include: {
                model: Authors,
                as: "author",
                attributes: ["author_id", "name"]
            }
        });

        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada." });
        }

        await post.destroy();

        return res.status(200).json({
            status: "deleted",
            data: post,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message
        });
    }
};

module.exports = { index, search, show, create, update, destroy };
