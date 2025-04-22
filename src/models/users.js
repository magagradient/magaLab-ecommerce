const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Users = sequelize.define("Users", {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Valida que sea un email válido
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        registration_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Fecha por defecto al momento de registro
        },
    }, {
        tableName: "users", // Nombre de la tabla en la BD
        timestamps: false, // No agregar createdAt y updatedAt automáticamente
    });

    return Users;
};
