const { Products, Categories, Series, Keywords, Styles, Colors, Themes, ProductImages } = require("../../../database/indexModels");
const { Op, fn, col, where } = require("sequelize");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const search = async (req, res) => {
  const { term } = req.query;

  if (!term || term.trim() === "") {
    return errorResponse(
      res,
      "bad_request",
      "Se requiere un término de búsqueda.",
      "products_search",
      400
    );
  }

  const searchTerm = term.toLowerCase();

  try {
    const products = await Products.findAll({
      subQuery: false,
      where: {
        [Op.or]: [
          where(fn("LOWER", col("Products.title")), {
            [Op.like]: `%${searchTerm}%`
          }),
          where(fn("LOWER", col("Products.description")), {
            [Op.like]: `%${searchTerm}%`
          }),
          where(fn("LOWER", col("category.name")), {
            [Op.like]: `%${searchTerm}%`
          }),
          where(fn("LOWER", col("series.title")), {
            [Op.like]: `%${searchTerm}%`
          }),
          where(fn("LOWER", col("keywords.name")), {
            [Op.like]: `%${searchTerm}%`
          }),
          // where(fn("LOWER", col("styles.name")), {
          //   [Op.like]: `%${searchTerm}%`
          // }),
          where(fn("LOWER", col("colors.name")), {
            [Op.like]: `%${searchTerm}%`
          }),
          // where(fn("LOWER", col("themes.name")), {
          //   [Op.like]: `%${searchTerm}%`
          // })
        ]
      },
      attributes: {
        exclude: ["created_at", "updated_at", "createdAt", "updatedAt"]
      },
      include: [
        {
          model: ProductImages,
          as: "images",
          attributes: ["id_image", "image_url", "image_type"],
          required: false
        },
        { model: Categories, as: "category" },
        { model: Series, as: "series" },
        { model: Colors, as: "colors" },
        { model: Keywords, as: "keywords" },
        { model: Styles, as: "styles" },
        { model: Themes, as: "themes" }
      ],
      
      order: [
        [{ model: ProductImages, as: "images" }, "image_type", "ASC"]
      ]
    });

    const extendedResults = products.filter(product => {
      const fields = [
        product.category?.name,
        product.series?.title,
        ...product.keywords.map(k => k.name),
        ...product.styles.map(s => s.name),
        ...product.colors.map(c => c.name),
        ...product.themes.map(t => t.name)
      ];
      return fields.some(f => f?.toLowerCase().includes(searchTerm));
    });

    const totalResults = [
      ...products,
      ...extendedResults.filter(r => !products.includes(r))
    ];

    return successResponse(res, {
      results: products,
      total: products.length
    }, "products_search");

  } catch (error) {
    console.error("🔴 Error en búsqueda:", error);
    return errorResponse(
      res,
      "server_error",
      "Error al realizar la búsqueda.",
      "products_search",
      500
    );
  }
};

module.exports = search;
