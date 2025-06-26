const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const idParamSchema = require("../validators/shared/idParamSchema");
const userIdParamSchema = require("../validators/shared/userIdParamSchema");
const createShoppingCartSchema = require("../validators/shoppingCarts/createShoppingCartSchema");

// get
const show = require("../controllers/shoppingCarts/get/show");
const getActiveCartByUser = require("../controllers/shoppingCarts/get/showByUser");

// post
const create = require("../controllers/shoppingCarts/post/create");
const clearCart = require("../controllers/shoppingCarts/post/clearCart");

// patch
const updateCart = require("../controllers/shoppingCarts/patch/updateCart")

// delete  
const destroy = require("../controllers/shoppingCarts/delete/destroy");


/*-------------------------------------------------*/

// GET
router.get("/:id", validateSchema(idParamSchema, "params"), show);
router.get("/user/:id_user", validateSchema(userIdParamSchema, "params"), getActiveCartByUser);

// POST
router.post("/",
    validateSchema(createShoppingCartSchema, "body"),
    create
);
router.post("/clear/:id", validateSchema(idParamSchema, "params"), clearCart);

// PATCH
router.patch('/:id', validateSchema(idParamSchema, "params"), updateCart);

// DELETE
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;
