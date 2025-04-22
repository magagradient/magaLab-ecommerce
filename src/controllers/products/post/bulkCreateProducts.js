const { Products, Categories, Series, Keywords, Styles, Colors, Themes } = require("../../../database/indexModels");

const bulkCreateProducts = async (req, res) => {
    try {
        const products = req.body.products;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: 'Debe enviar un array de productos para crear.',
            });
        }

        const cleanedProducts = products.map(product => {
            // si id_product está presente, lo removemos (solo si es necesario)
            const { id_product, ...productWithoutId } = product; 
            return productWithoutId;
        });

        // crear los productos sin el id_product
        const createdProducts = await Products.bulkCreate(cleanedProducts, {
            validate: true,
            returning: true,  // esto te asegura que el objeto completo es devuelto
        });

        // ssignar relaciones si están presentes (usando set para las relaciones)
        for (let i = 0; i < createdProducts.length; i++) {
            const createdProduct = createdProducts[i];
            const originalData = products[i]; // este es el producto original con arrays

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

        // traer los productos con sus relaciones completas
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

        // devolver los productos creados junto con sus relaciones
        return res.status(201).json({
            message: "Productos creados exitosamente.",
            data: finalProducts,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('Error en bulkCreate:', error);

        // verificar si el error es una violación de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Error de validación al crear productos.',
                error: {
                    errors: error.errors.map(err => ({
                        message: err.message,
                        type: err.type,
                        path: err.path
                    }))
                }
            });
        }

        // si no es un error de validación, devolver el error genérico
        return res.status(500).json({
            message: 'Error al crear productos.',
            error: error.message || error.toString(), // más robusto
        });
    }
};

module.exports = bulkCreateProducts;
