const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

const createCartItemSchema = require("../validators/cartItems/createCartItemSchema");
const updateCartItemSchema = require("../validators/cartItems/updateCartItemSchema");
const idParamSchema = require("../validators/shared/idParamSchema");


// get
const index = require("../controllers/cartItems/get/index"); 
const summary = require("../controllers/cartItems/get/summary");

// post
const create = require("../controllers/cartItems/post/create"); 

// put
const update = require("../controllers/cartItems/put/update"); 

// delete
const destroy = require("../controllers/cartItems/delete/destroy"); 
const clearCartItems = require("../controllers/cartItems/delete/clearAll"); 

/*-------------------------------------------------*/ 


// get
router.get("/", index);  // /api/cart_items?user_id=13
router.get("/summary", summary);

// post
router.post("/", validateSchema(createCartItemSchema, "body"), create);

// put
router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateCartItemSchema, "body"),
    update
);

// delete
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);
router.delete("/", clearCartItems); 


module.exports = router;
