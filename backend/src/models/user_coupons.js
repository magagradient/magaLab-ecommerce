const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const UserCoupons = sequelize.define("UserCoupons", {
        id_user_coupon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id_user",
            },
            onDelete: "CASCADE",
        },
        id_coupon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Coupons",
                key: "id_coupon",
            },
            onDelete: "CASCADE",
        },
        used: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0, // 0 = no usado, 1 = usado
        },
        granted_date: {
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "user_coupons",
        timestamps: false,
        freezeTableName: true 
    });

    return UserCoupons;
};
