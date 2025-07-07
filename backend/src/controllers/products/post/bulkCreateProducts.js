const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const bulkCreateProducts = async (req, res) => {
    try {
        const products = req.body.products;

        if (!Array.isArray(products) || products.length === 0) {
            return errorResponse(res, "bad_request", "Debe enviar un array de productos para crear.", "products/bulkCreateProducts", 400);
        }

        const cleanedProducts = products.map(product => {
            const { id_product, ...productWithoutId } = product;
            return productWithoutId;
        });

        const createdProducts = await Products.bulkCreate(cleanedProducts, {
            validate: true,
            returning: true,
        });

        for (let i = 0; i < createdProducts.length; i++) {
            const createdProduct = createdProducts[i];
            const originalData = products[i];

            if (originalData.styles) {
                await createdProduct.setStyles(originalData.styles);
            }
            if (originalData.themes) {
                await createdProduct.setThemes(originalData.themes);
            }
            if (originalData.keywords) {
                await createdProduct.setKeywords(originalData.keywords);
            }
            if (originalData.colors) {
                await createdProduct.setColors(originalData.colors);
            }
        }

        const finalProducts = await Products.findAll({
            where: {
                id_product: createdProducts.map(p => p.id_product)
            },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" },
                { model: Keywords, as: "keywords", through: { attributes: [] } },
                { model: Colors, as: "colors", through: { attributes: [] } },
                { model: Styles, as: "styles", through: { attributes: [] } },
                { model: Themes, as: "themes", through: { attributes: [] } }
            ]
        });

        return successResponse(res, finalProducts, "products/bulkCreateProducts");
    } catch (error) {
        console.error('Error en bulkCreate:', error);

        if (error.name === 'SequelizeValidationError') {
            return errorResponse(res, "validation_error", "Error de validación al crear productos.", "products/bulkCreateProducts", 400);
        }

        return errorResponse(res, "server_error", "Error al crear productos.", "products/bulkCreateProducts", 500);
    }
};

module.exports = bulkCreateProducts;
