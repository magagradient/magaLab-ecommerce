const express = require("express");
const router = express.Router();

// get
const index = require("../controllers/categories/get/index");
const show = require("../controllers/categories/get/show");
const productsByCategory = require("../controllers/categories/get/productsByCategory");

// post
const create = require("../controllers/categories/post/create");

// put
const update = require("../controllers/categories/put/update");

// delete
const destroy = require("../controllers/categories/delete/destroy");

/* ------------------------------- */

// get
router.get("/:id", show);
router.get("/:id/products", productsByCategory);
router.get("/", index);

// post
router.post("/", create);

// put
router.put("/:id", update);

// delete
router.delete("/:id", destroy);

module.exports = router;
