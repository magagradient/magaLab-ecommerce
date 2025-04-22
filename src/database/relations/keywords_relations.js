// relaciones entre productos y palabras clave:


module.exports = (models) => {
    // un producto puede tener muchas keywords:
    models.Products.belongsToMany(models.Keywords, {
        through: models.ProductKeywords,
        foreignKey: "id_product",
        as: "keywords"
    });

    // una keyword puede estar en muchos productos:
    models.Keywords.belongsToMany(models.Products, {
        through: models.ProductKeywords,
        foreignKey: "id_keyword",
        as: "products"
    });

    // relaciones directas para el include en ProductKeywords:
    models.ProductKeywords.belongsTo(models.Products, { 
        foreignKey: "id_product",
        as: "product" 
    });

    models.ProductKeywords.belongsTo(models.Keywords, { 
        foreignKey: "id_keyword",
        as: "keyword" 
    });

    // relaciones inversas para usar include desde Products y Keywords
    models.Products.hasMany(models.ProductKeywords, {
        foreignKey: "id_product",
        as: "productKeywords"
    });

    models.Keywords.hasMany(models.ProductKeywords, {
        foreignKey: "id_keyword",
        as: "keywordProducts"
    });
};
