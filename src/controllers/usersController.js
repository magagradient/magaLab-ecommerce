const { Users } = require("../database/indexModels");
const { Op } = require("sequelize");


const index = async (req, res) => {
    try {
        const allUsers = await Users.findAll({
            attributes: { exclude: ["password"] }
        });

        if (allUsers.length > 0) {
            return res.status(200).json({
                results: allUsers,
                total: allUsers.length,
                status: "success",
                source: "users_index",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({
            error: "No se encontraron usuarios.",
            status: "not_found",
            source: "users_index",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "users_index",
            timestamp: new Date().toISOString()
        });
    }
};

const search = async (req, res) => {
    try {
        const query = req.params.query || req.query.query;

        if (!query) return res.status(400).json({
            error: "Falta término de búsqueda.",
            status: "bad_request",
            source: "users_search",
            timestamp: new Date().toISOString()
        });

        const users = await Users.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { email: { [Op.like]: `%${query}%` } }
                ]
            },
            attributes: { exclude: ["password"] }
        });

        if (users.length === 0) return res.status(404).json({
            error: "No se encontraron usuarios.",
            status: "not_found",
            source: "users_search",
            timestamp: new Date().toISOString()
        });

        return res.status(200).json({
            results: users,
            total: users.length,
            status: "success",
            source: "users_search",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error en búsqueda de usuarios:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "users_search",
            timestamp: new Date().toISOString()
        });
    }
};


const show = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_show",
            timestamp: new Date().toISOString()
        });

        return res.status(200).json({
            result: user,
            status: "success",
            source: "user_show",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_show",
            timestamp: new Date().toISOString()
        });
    }
};


const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios.",
                status: "bad_request",
                source: "user_create",
                timestamp: new Date().toISOString()
            });
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                error: "Los campos deben ser cadenas de texto.",
                status: "bad_request",
                source: "user_create",
                timestamp: new Date().toISOString()
            });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                error: "El email ya está registrado.",
                status: "conflict",
                source: "user_create",
                timestamp: new Date().toISOString()
            });
        }

        const newUser = await Users.create({ name, email, password });
        const createdUser = await Users.findByPk(newUser.id_user, {
            attributes: { exclude: ["password"] },
            include: [] // Agregá aquí las asociaciones si tenés
        });

        return res.status(201).json({
            result: createdUser,
            status: "success",
            source: "user_create",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_create",
            timestamp: new Date().toISOString()
        });
    }
};


const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Users.findByPk(req.params.id);

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_update",
            timestamp: new Date().toISOString()
        });

        if (email) {
            const emailExists = await Users.findOne({
                where: {
                    email,
                    id_user: { [Op.ne]: user.id_user }
                }
            });
            if (emailExists) {
                return res.status(409).json({
                    error: "Ese email ya está en uso.",
                    status: "conflict",
                    source: "user_update",
                    timestamp: new Date().toISOString()
                });
            }
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        const updatedUser = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] },
            include: [] // Agregá asociaciones si aplica
        });

        return res.status(200).json({
            result: updatedUser,
            status: "success",
            source: "user_update",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_update",
            timestamp: new Date().toISOString()
        });
    }
};


const destroy = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_destroy",
            timestamp: new Date().toISOString()
        });

        const userToDelete = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] },
            include: [] // Agregá asociaciones si aplica
        });

        await user.destroy();

        return res.status(200).json({
            result: userToDelete,
            status: "deleted",
            source: "user_destroy",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_destroy",
            timestamp: new Date().toISOString()
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
