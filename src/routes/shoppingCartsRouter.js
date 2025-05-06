const express = require("express");
const router = express.Router();

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

// get
router.get("/:id", show); 
router.get("/user/:id_user", getActiveCartByUser); 

// post
router.post("/", create); 
router.post("/clear/:id", clearCart);

// patch
router.patch('/:id', updateCart); 

// delete
router.delete("/:id", destroy);


module.exports = router;
