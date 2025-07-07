const { OrdersProducts, Orders, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_order, id_product, quantity, unit_price } = req.body;

    try {
        // Verificar existencia de la orden
        const order = await Orders.findByPk(id_order);
        if (!order) {
            return responseHelper.errorResponse(
                res,
                "order_not_found",
                `La orden con id ${id_order} no existe.`,
                "ordersProducts_create",
                404
            );
        }

        // Verificar existencia del producto
        const product = await Products.findByPk(id_product);
        if (!product) {
            return responseHelper.errorResponse(
                res,
                "product_not_found",
                `El producto con id ${id_product} no existe.`,
                "ordersProducts_create",
                404
            );
        }

        // Crear el registro
        const newRecord = await OrdersProducts.create({
            id_order,
            id_product,
            quantity: quantity || 1,
            unit_price,
        });

        return responseHelper.successResponse(res, newRecord, "ordersProducts_create", 201);

    } catch (error) {
        console.error("Error creating order-product record:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "ordersProducts_create",
            500
        );
    }
};

module.exports = create;
