const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {  
    const Keywords = sequelize.define("Keywords", {
        id_keyword: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: "keywords",
        timestamps: false // No incluye `createdAt` ni `updatedAt`
    });

    return Keywords;
};
