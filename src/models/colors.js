const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Colors = sequelize.define('Colors', {
        id_color: {
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
        tableName: 'colors',
        timestamps: false
    });
    
    return Colors;
};
