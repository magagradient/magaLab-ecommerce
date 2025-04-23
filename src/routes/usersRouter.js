const express = require("express");
const router = express.Router();


// get
const index = require("../controllers/users/get/index");
const show = require("../controllers/users/get/show");

// post
const create = require("../controllers/users/post/create");

// put
const update = require("../controllers/users/put/update");

// delete
const destroy = require("../controllers/users/delete/destroy");


/*-------------------------------------------------*/ 

// get
router.get("/", index);  // puede ir primero o último
router.get("/:id", show);

//post
router.post("/", create);

// put
router.put("/:id", update);

// delete
router.delete("/:id", destroy);


module.exports = router;
