const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Themes = sequelize.define("Themes", {
        id_theme: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: "themes",
        timestamps: false,
        freezeTableName: true 
    });

    return Themes;
};
