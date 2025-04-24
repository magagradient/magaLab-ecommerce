const express = require("express");
const router = express.Router();

// get
const index = require("../controllers/cartItems/get/index");
const show = require("../controllers/cartItems/get/show");

// post
const create = require("../controllers/cartItems/post/create");


// put
const update = require("../controllers/cartItems/put/update");

// delete
const destroy = require("../controllers/cartItems/delete/destroy");

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
