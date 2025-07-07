const { CartItems, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const cartSummary = async (req, res) => {
    const { id_cart } = req.query;

    if (!id_cart) {
        return responseHelper.errorResponse(
            res,
            "bad_request",
            "Falta el parámetro id_cart.",
            "cart_summary",
            400
        );
    }

    try {
        const items = await CartItems.findAll({
            where: { id_cart },
            include: {
                model: Products,
                as: "product",
                attributes: ["id_product", "title", "price"]
            }
        });

        if (!items.length) {
            return responseHelper.successResponse(res, {
                total_items: 0,
                subtotal: 0,
                discounts: 0,
                total: 0,
                products: []
            }, "cart_summary");
        }

        let subtotal = 0;
        let totalItems = 0;
        const products = [];

        items.forEach(item => {
            const itemPrice = item.product?.price || 0;
            subtotal += itemPrice * item.quantity;
            totalItems += item.quantity;
            
            products.push({
                id_product: item.product.id_product,
                title: item.product.title,
                quantity: item.quantity,
                unit_price: itemPrice,
                total_price: itemPrice * item.quantity
            });
        });

        const discounts = 0; // Futuro: aplicar cupones o promociones
        const total = subtotal - discounts;

        return responseHelper.successResponse(res, {
            total_items: totalItems,
            subtotal,
            discounts,
            total,
            products
        }, "cart_summary");

    } catch (error) {
        console.error("Error al obtener resumen del carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_summary",
            500
        );
    }
};

module.exports = cartSummary;
