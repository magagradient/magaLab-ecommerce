const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Categories = sequelize.define('Categories', {
        id_category: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'categories',
        timestamps: false
    });

    Categories.associate = (models) => {
        // Relaciones de categorías con productos
        Categories.hasMany(models.Products, {
            foreignKey: 'id_category',
            as: 'products'
        });
    };

    return Categories;
};
