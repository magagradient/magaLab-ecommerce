const { DownloadLinks, Users, Products } = require("../database/indexModels");
const { Op } = require("sequelize");

// Obtener todos los links de descarga
const index = async (req, res) => {
    try {
        const allLinks = await DownloadLinks.findAll({
            include: [
                {
                    model: Users,
                    as: "userDownload",
                    attributes: ["id_user", "name", "email"]
                },
                {
                    model: Products,
                    as: "product",
                    attributes: ["id_product", "title"]
                }
            ]
        });

        if (allLinks.length === 0) {
            return res.status(404).json({ error: "No se encontraron enlaces para listar." });
        }

        return res.status(200).json({
            results: allLinks,
            total: allLinks.length,
            status: "success",
            source: "download_links",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al listar links:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Buscar enlaces por término
const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
        }

        const links = await DownloadLinks.findAll({
            where: {
                [Op.or]: [
                    { download_url: { [Op.like]: `%${query}%` } },
                    { expires_at: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [
                { model: Users, as: "userDownload", attributes: ["id_user", "name"] },
                { model: Products, as: "product", attributes: ["id_product", "title"] }
            ]
        });

        if (links.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results: links,
            total: links.length,
            status: "success",
            source: "download_links_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en la búsqueda de links:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Obtener un link por ID
const show = async (req, res) => {
    try {
        const link = await DownloadLinks.findByPk(req.params.id, {
            include: [
                { model: Users, as: "userDownload", attributes: ["id_user", "name", "email"] },
                { model: Products, as: "product", attributes: ["id_product", "title"] }
            ]
        });

        if (!link) {
            return res.status(404).json({ error: "Enlace no encontrado." });
        }

        return res.status(200).json(link);
    } catch (error) {
        console.error("Error al obtener el enlace:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Crear un nuevo link
const create = async (req, res) => {
    try {
        const { id_user, id_product, download_url, expires_at } = req.body;

        if (!id_user || !id_product || !download_url || !expires_at) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const newLink = await DownloadLinks.create({
            id_user,
            id_product,
            download_url,
            expires_at
        });

        return res.status(201).json(newLink);
    } catch (error) {
        console.error("Error al crear el enlace:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Actualizar un link
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { download_url, expires_at, used } = req.body;

        const link = await DownloadLinks.findByPk(id);
        if (!link) {
            return res.status(404).json({ error: "Enlace no encontrado." });
        }

        const updates = {};
        if (download_url) updates.download_url = download_url;
        if (expires_at) updates.expires_at = expires_at;
        if (used !== undefined) updates.used = used;

        await link.update(updates);

        return res.status(200).json(link);
    } catch (error) {
        console.error("Error al actualizar el enlace:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

// Eliminar un link
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await DownloadLinks.findByPk(id);

        if (!link) {
            return res.status(404).json({ error: "Enlace no encontrado." });
        }

        await link.destroy();
        return res.status(200).json({ message: "Enlace eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el enlace:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = { index, 
    search, 
    show, 
    create, 
    update, 
    destroy 
};
