const express = require("express");
const router = express.Router();

// Controllers
const index = require("../controllers/productKeywords/get/index");
const byProduct = require("../controllers/productKeywords/get/byProduct");

const create = require("../controllers/productKeywords/post/create");

const destroy = require("../controllers/productKeywords/delete/destroy");

// Routes
router.get("/", index);
router.get("/product/:id_product", byProduct);

router.post("/", create);

router.delete("/:id_product/:id_keyword", destroy);

module.exports = router;
