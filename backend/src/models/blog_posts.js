const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BlogPosts = sequelize.define("BlogPosts", {
        id_post: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: "blog_posts",
        timestamps: false,
        freezeTableName: true 
    });

    return BlogPosts;
};
