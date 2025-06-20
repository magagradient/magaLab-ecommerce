const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

// Schemas
const idProductParamSchema = require("../validators/productKeywords/idProductParamSchema");
const createProductKeywordSchema = require("../validators/productKeywords/createProductKeywordSchema");
const paramsProductKeywordSchema = require("../validators/productKeywords/paramsProductKeywordSchema");

// Controllers
const index = require("../controllers/productKeywords/get/index");
const byProduct = require("../controllers/productKeywords/get/byProduct");

const create = require("../controllers/productKeywords/post/create");

const destroy = require("../controllers/productKeywords/delete/destroy");

// Routes
router.get("/", index);
router.get("/product/:id_product", validateSchema(idProductParamSchema, "params"), byProduct);

router.post("/", validateSchema(createProductKeywordSchema, "body"), create);

router.delete("/:id_product/:id_keyword", validateSchema(paramsProductKeywordSchema, "params"), destroy);

module.exports = router;