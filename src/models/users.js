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
        },
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user', // Por defecto, será 'user'
        }
    }, {
        tableName: 'users',
        timestamps: false, 
    });

    return Users;
};
