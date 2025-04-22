// relaciones del modulo blog

module.exports = (models) => {
// un autor puede tener muchos posts
models.Authors.hasMany(models.BlogPosts, {
    foreignKey: "author_id",
    as: "posts"
});
    // cada post pertenece a un autor
models.BlogPosts.belongsTo(models.Authors, {
    foreignKey: "author_id",
    as: "author"
});
};

