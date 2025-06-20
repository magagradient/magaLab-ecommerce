const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

const idParamSchema = require("../validators/shared/idParamSchema");

const {
    productImageParamsSchema,
    createProductImageSchema
} = require("../validators/productImages");

/* --------------------------------------------- */

// controllers
const index = require("../controllers/productImages/get/index");
const create = require("../controllers/productImages/post/create");
const destroy = require("../controllers/productImages/delete/destroy");
const clear = require("../controllers/productImages/delete/clear");

/* --------------------------------------------- */

// rutas
router.get("/:id/images",
    validateSchema(idParamSchema, "params"),
    index
);

router.post("/:id/images",
    validateSchema(idParamSchema, "params"),
    validateSchema(createProductImageSchema, "body"),
    create
);

router.delete("/:id/images/:imageId",
    validateSchema(productImageParamsSchema, "params"),
    destroy
);

router.delete("/:id/images",
    validateSchema(idParamSchema, "params"),
    clear
);

module.exports = router; 