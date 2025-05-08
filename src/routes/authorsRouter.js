const express = require('express');
const router = express.Router();


// get
const index = require("../controllers/authors/get/index")
const show = require("../controllers/authors/get/show")
const search = require("../controllers/authors/get/search")

// post
const create = require("../controllers/authors/post/create")

// put
const update = require("../controllers/authors/put/update")

// delete
const destroy = require("../controllers/authors/delete/destroy")


/* ---------------------------------------------- */

//get
router.get("/search", search);
router.get('/', index);
router.get("/:id", show);

// post
router.post("/", create);

// put
router.put("/:id", update);

// delete
router.delete("/:id", destroy);

module.exports = router;
