const { PasswordResets, Users } = require("../database/indexModels");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try {
        const allResets = await PasswordResets.findAll({
            include: [{ model: Users, as: "user" }],
        });

        if (allResets.length > 0) {
            return res.status(200).json({
                results: allResets,
                total: allResets.length,
                status: "success",
                source: "password_resets",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(404).json({
            error: "No se encontraron registros de reseteo.",
            status: "not_found",
            source: "password_resets",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al obtener registros:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets",
            timestamp: new Date().toISOString(),
        });
    }
};

const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({
                error: "Falta término de búsqueda.",
                status: "bad_request",
                source: "password_resets_search",
                timestamp: new Date().toISOString(),
            });
        }

        const results = await PasswordResets.findAll({
            where: {
                token: { [Op.like]: `%${query}%` },
            },
            include: [{ model: Users, as: "user" }],
        });

        if (results.length === 0) {
            return res.status(404).json({
                error: "No se encontraron resultados.",
                status: "not_found",
                source: "password_resets_search",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "password_resets_search",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_search",
            timestamp: new Date().toISOString(),
        });
    }
};

const show = async (req, res) => {
    try {
        const reset = await PasswordResets.findByPk(req.params.id, {
            include: [{ model: Users, as: "user" }],
        });

        if (!reset) {
            return res.status(404).json({
                error: "Registro no encontrado.",
                status: "not_found",
                source: "password_resets_show",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            result: reset,
            status: "success",
            source: "password_resets_show",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al obtener registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_show",
            timestamp: new Date().toISOString(),
        });
    }
};

const create = async (req, res) => {
    try {
        const { id_user, token, expires_at, used } = req.body;

        if (!id_user || !token || !expires_at) {
            return res.status(400).json({
                error: "Los campos id_user, token y expires_at son obligatorios.",
                status: "bad_request",
                source: "password_resets_create",
                timestamp: new Date().toISOString(),
            });
        }

        const newReset = await PasswordResets.create({
            id_user,
            token,
            expires_at,
            used: used ?? false,
        });

        const result = await PasswordResets.findByPk(newReset.id_reset, {
            include: [{ model: Users, as: "user" }],
        });

        return res.status(201).json({
            result,
            status: "created",
            source: "password_resets_create",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al crear registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_create",
            timestamp: new Date().toISOString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const reset = await PasswordResets.findByPk(req.params.id);

        if (!reset) {
            return res.status(404).json({
                error: "Registro no encontrado.",
                status: "not_found",
                source: "password_resets_update",
                timestamp: new Date().toISOString(),
            });
        }

        const { token, used, expires_at } = req.body;

        if (token) reset.token = token;
        if (used !== undefined) reset.used = used;
        if (expires_at) reset.expires_at = expires_at;

        await reset.save();

        const result = await PasswordResets.findByPk(req.params.id, {
            include: [{ model: Users, as: "user" }],
        });

        return res.status(200).json({
            result,
            status: "updated",
            source: "password_resets_update",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al actualizar registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_update",
            timestamp: new Date().toISOString(),
        });
    }
};

const destroy = async (req, res) => {
    try {
        const reset = await PasswordResets.findByPk(req.params.id, {
            include: [{ model: Users, as: "user" }],
        });

        if (!reset) {
            return res.status(404).json({
                error: "Registro no encontrado.",
                status: "not_found",
                source: "password_resets_destroy",
                timestamp: new Date().toISOString(),
            });
        }

        await reset.destroy();

        return res.status(200).json({
            message: "Registro eliminado correctamente.",
            deleted: reset,
            status: "deleted",
            source: "password_resets_destroy",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al eliminar registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_destroy",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = {
    index,
    search,
    show,
    create,
    update,
    destroy,
};
