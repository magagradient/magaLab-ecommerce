const express = require("express");
const router = express.Router();

// get
const index = require("../controllers/shoppingCarts/get/index");
const show = require("../controllers/shoppingCarts/get/show");

// post
const create = require("../controllers/shoppingCarts/post/create");

// put
const update = require("../controllers/shoppingCarts/put/update");

// delete  
const destroy = require("../controllers/passwordChanges/get/search");


/*-------------------------------------------------*/ 

// get
router.get("/", index);
router.get("/:id", show);

// post
router.post("/", create);

// put
router.put("/:id", update);

// delete
router.delete("/:id", destroy);



module.exports = router;
