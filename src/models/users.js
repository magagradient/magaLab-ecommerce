const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Users = sequelize.define('Users', {
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
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        registration_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        tableName: 'users',
        timestamps: false, // No crea createdAt y updatedAt
    });

    return Users;
};
