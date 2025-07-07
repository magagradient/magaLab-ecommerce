module.exports = (models) => {
    // products - categories:
    models.Categories.hasMany(models.Products, {
        foreignKey: "id_category",
        as: "products"
    });
    models.Products.belongsTo(models.Categories, {
        foreignKey: "id_category",
        as: "category"
    });

    // products - images:
    models.Products.hasMany(models.ProductImages, {
        foreignKey: "id_product",
        as: "images"
    });
    models.ProductImages.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });

    // products - colors
    models.Products.belongsToMany(models.Colors, {
        through: models.ProductColors,
        foreignKey: "id_product",
        as: "colors"
    });
    models.Colors.belongsToMany(models.Products, {
        through: models.ProductColors,
        foreignKey: "id_color",
        as: "products"
    });

    // relación directa ProductColors
    models.ProductColors.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });
    models.ProductColors.belongsTo(models.Colors, {
        foreignKey: "id_color",
        as: "color"
    });

    // products - styles
    models.Products.belongsToMany(models.Styles, {
        through: models.ProductStyles,
        foreignKey: "id_product",
        as: "styles"
    });
    models.Styles.belongsToMany(models.Products, {
        through: models.ProductStyles,
        foreignKey: "id_style",
        as: "products"
    });

    models.ProductStyles.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });
    models.ProductStyles.belongsTo(models.Styles, {
        foreignKey: "id_style",
        as: "style"
    });
    models.Products.hasMany(models.ProductStyles, {
        foreignKey: "id_product",
        as: "productStyles"
    });
    models.Styles.hasMany(models.ProductStyles, {
        foreignKey: "id_style",
        as: "styleProducts"
    });

    // products - themes:
    models.Products.belongsToMany(models.Themes, {
        through: models.ProductThemes,
        foreignKey: "id_product",
        as: "themes"
    });
    models.Themes.belongsToMany(models.Products, {
        through: models.ProductThemes,
        foreignKey: "id_theme",
        as: "products"
    });
    models.ProductThemes.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });
    models.Products.hasMany(models.ProductThemes, {
        foreignKey: "id_product",
        as: "productThemes"
    });
    models.ProductThemes.belongsTo(models.Themes, {
        foreignKey: "id_theme",
        as: "theme"
    });
    models.Themes.hasMany(models.ProductThemes, {
        foreignKey: "id_theme",
        as: "themeProducts"
    });


    // product - series
    models.Series.hasMany(models.Products, {
        foreignKey: 'id_series',
        as: 'products'
    });

    models.Products.belongsTo(models.Series, {
        foreignKey: 'id_series',
        as: 'series'
    });


};
