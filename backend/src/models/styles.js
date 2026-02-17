const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Styles = sequelize.define("Styles", {
        id_style: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: "styles",
        timestamps: false,
        freezeTableName: true 
    });

    return Styles;
};
