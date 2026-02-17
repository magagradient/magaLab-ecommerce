const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PasswordChanges = sequelize.define("PasswordChange", {
        id_change: {
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
        change_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ip_address: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: "password_changes",
        timestamps: false,
        freezeTableName: true 
    });

    return PasswordChanges;
};
