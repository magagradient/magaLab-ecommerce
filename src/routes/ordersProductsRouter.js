const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const {
    ordersProductsParamsSchema,
    ordersProductsCreateSchema,
    ordersProductsUpdateSchema,
    ordersProductsOnlyOrderParamSchema
} = require("../validators/ordersProducts");


// Controllers
const index = require("../controllers/ordersProducts/get/index");
const byOrder = require("../controllers/ordersProducts/get/byOrder");

const create = require("../controllers/ordersProducts/post/create");

const update = require("../controllers/ordersProducts/put/update");

const destroy = require("../controllers/ordersProducts/delete/destroy");

/* ---------------------------------- */

// Routes
router.get("/", index);
router.get("/:id_order", validateSchema(ordersProductsOnlyOrderParamSchema, "params"), byOrder);

router.post("/", validateSchema(ordersProductsCreateSchema, "body"), create);

router.put("/:id_order/:id_product",
    validateSchema(ordersProductsParamsSchema, "params"),
    validateSchema(ordersProductsUpdateSchema, "body"),
    update);

router.delete("/:id_order/:id_product", validateSchema(ordersProductsParamsSchema, "params"), destroy);

module.exports = router;
