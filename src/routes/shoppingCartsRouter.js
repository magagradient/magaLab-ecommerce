const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

const idParamSchema = require("../validators/shared/idParamSchema");
const userIdParamSchema = require("../validators/shared/userIdParamSchema");
const createShoppingCartSchema = require("../validators/shoppingCarts/createShoppingCartSchema");

// Controllers
const show = require("../controllers/shoppingCarts/get/show");
const getActiveCartByUser = require("../controllers/shoppingCarts/get/showByUser");

const create = require("../controllers/shoppingCarts/post/create");
const clearCart = require("../controllers/shoppingCarts/post/clearCart");

const updateCart = require("../controllers/shoppingCarts/patch/updateCart");
const destroy = require("../controllers/shoppingCarts/delete/destroy");

/*-------------------------------------------------*/

// GET
router.get("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    show
);

router.get("/user/:id_user",
    authMiddleware,
    validateSchema(userIdParamSchema, "params"),
    getActiveCartByUser
);

// POST
router.post("/",
    authMiddleware,
    validateSchema(createShoppingCartSchema, "body"),
    create
);

router.post("/clear/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    clearCart
);

// PATCH
router.patch("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    updateCart
);

// DELETE
router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
