const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PasswordResets = sequelize.define("PasswordResets", {
        id_reset: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id_user"
            },
            onDelete: "CASCADE"
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        request_date: {
            type: DataTypes.DATE,  // cambio de TIMESTAMP a DATE
            defaultValue: DataTypes.NOW
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        expires_at: {
            type: DataTypes.DATE,  // cambio de TIMESTAMP a DATE
            allowNull: false
        }
    }, {
        tableName: "password_resets",
        timestamps: false,
        freezeTableName: true 
    });

    return PasswordResets;
};
