const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const DownloadLinks = sequelize.define("DownloadLinks", {
        id_link: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id_user"
            },
            onDelete: "CASCADE"
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id_product"
            },
            onDelete: "CASCADE"
        },
        download_url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "download_links",
        timestamps: false // No incluye `createdAt` y `updatedAt`
    });

    return DownloadLinks;
};
