const express = require('express');
const router = express.Router();

// get
const productsByColor = require("../controllers/colors/get/productsByColor");
const index = require("../controllers/colors/get/index");
const show = require("../controllers/colors/get/show");

// post
const create = require("../controllers/colors/post/create");

// put
const update = require("../controllers/colors/put/update");

// delete
const destroy = require("../controllers/colors/delete/destroy");


/*-------------------------------------------*/

// get
router.get("/", index);        
router.get("/:id", show);     
router.get("/:id/products", productsByColor);  

// post
router.post("/", create); 

// put
router.put("/:id", update); 

// delete
router.delete("/:id", destroy); 

module.exports = router; 
