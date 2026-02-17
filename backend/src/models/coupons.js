const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Coupons = sequelize.define('Coupons', {
        id_coupon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        expiration_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        max_uses: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        type: {
            type: DataTypes.ENUM('general', 'personalized'),
            allowNull: false
        }
    }, {
        tableName: 'coupons',
        timestamps: false,
        freezeTableName: true 
    });

    return Coupons;
};
