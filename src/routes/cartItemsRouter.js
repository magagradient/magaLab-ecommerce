const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

const createCartItemSchema = require("../validators/cartItems/createCartItemSchema");
const updateCartItemSchema = require("../validators/cartItems/updateCartItemSchema");
const idParamSchema = require("../validators/shared/idParamSchema");

// controllers
const index = require("../controllers/cartItems/get/index");
const summary = require("../controllers/cartItems/get/summary");

const create = require("../controllers/cartItems/post/create");

const update = require("../controllers/cartItems/put/update");

const destroy = require("../controllers/cartItems/delete/destroy");
const clearCartItems = require("../controllers/cartItems/delete/clearAll");

/////////////////////////////////////////////////////////

// get
router.get("/", authMiddleware, index);  // /api/cart_items?user_id=13
router.get("/summary", authMiddleware, summary);

// post
router.post("/", authMiddleware, validateSchema(createCartItemSchema, "body"), create);

// put
router.put("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(updateCartItemSchema, "body"),
    update
);

// delete
router.delete("/:id", authMiddleware, validateSchema(idParamSchema, "params"), destroy);
router.delete("/", authMiddleware, clearCartItems);

module.exports = router;
