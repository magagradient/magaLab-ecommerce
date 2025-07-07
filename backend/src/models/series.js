const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Series = sequelize.define('Series', {
        id_series: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        cover_image: DataTypes.STRING
    }, {
        tableName: 'series',
        timestamps: false
    });

    Series.associate = (models) => {
        Series.hasMany(models.Products, {
            foreignKey: 'id_series',
            as: 'products'
        });
    };

    return Series;
};
