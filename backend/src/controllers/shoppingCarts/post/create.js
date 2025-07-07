const { ShoppingCarts, Users } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const createShoppingCart = async (req, res) => {
    try {
        const { id_user } = req.body;

        if (!id_user) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "El campo id_user es requerido.",
                "shopping_cart_create",
                400
            );
        }

        const user = await Users.findByPk(id_user);
        if (!user) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Usuario no encontrado.",
                "shopping_cart_create",
                404
            );
        }

        // Verificar si ya tiene un carrito
        const existingCart = await ShoppingCarts.findOne({ where: { id_user } });

        if (existingCart) {
            return responseHelper.errorResponse(
                res,
                "conflict",
                "El usuario ya tiene un carrito activo.",
                "shopping_cart_create",
                409
            );
        }

        // Crear el carrito
        const newCart = await ShoppingCarts.create({ id_user });

        return responseHelper.successResponse(
            res,
            {
                message: "Carrito creado exitosamente.",
                cart: newCart
            },
            "shopping_cart_create",
            201
        );

    } catch (error) {
        console.error("Error al crear carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "shopping_cart_create",
            500
        );
    }
};

module.exports = createShoppingCart;
