const { Users } = require("../../../database/indexModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email y que no esté borrado
        const user = await Users.findOne({ where: { email, is_deleted: false } });
        if (!user) return res.status(401).json({ message: "Usuario o contraseña inválidos" });

        // Comparar password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Usuario o contraseña inválidos" });

        // Generar token JWT con id_user y role
        const token = jwt.sign(
            { id_user: user.id_user, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = login;
