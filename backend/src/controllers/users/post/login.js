const { Users } = require("../../../database/indexModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validaciones básicas
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Formato de datos inválido" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // buscar usuario por email y que no esté borrado
        const user = await Users.findOne({ 
            where: { email: normalizedEmail, is_deleted: false } 
        });

        if (!user) {
            return res.status(401).json({ message: "Usuario o contraseña inválidos" });
        }

        // comparar password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Usuario o contraseña inválidos" });
        }

        // generar token JWT
        const token = jwt.sign(
            { id_user: user.id_user, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = login;