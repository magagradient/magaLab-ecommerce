const express = require("express");
const router = express.Router();

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
router.post("/", create); 

// put
router.put("/:id", update); 

// delete
router.delete("/:id", destroy); 
router.delete("/", clearCartItems); 


module.exports = router;
