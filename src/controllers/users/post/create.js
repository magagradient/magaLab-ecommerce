const { Users } = require("../../../database/indexModels");

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

module.exports = create;