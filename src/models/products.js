const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Products = sequelize.define('Products', {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        is_sold: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        visible_in_portfolio: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        sold_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categories',  // Asegúrate que el nombre del modelo sea exacto
                key: 'id_category'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        id_series: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Series',  // Asegúrate que el nombre del modelo sea exacto
                key: 'id_series'
            }
        }
    }, {
        tableName: 'products',
        timestamps: true,  // Aquí activas el uso automático de createdAt y updatedAt
        underscored: true   // Esto cambia las convenciones de nombres a snake_case
    });

    return Products;
};
