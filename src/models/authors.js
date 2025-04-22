const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Authors = sequelize.define("Authors", {
        author_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "authors",
        timestamps: false // Porque estás usando created_at y updated_at manualmente
    });

    return Authors;
};
