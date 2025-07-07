const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const productStyleParamsSchema = require("../validators/productStyle/productStyleParamsSchema");
const productStyleIdParamSchema = require("../validators/productStyle/productStyleIdParamSchema");
const productStyleCreateSchema = require("../validators/productStyle/productStyleCreateSchema");

// controllers
const list = require("../controllers/productStyles/get/list");
const create = require("../controllers/productStyles/post/create");
const destroy = require("../controllers/productStyles/delete/destroy");

// rutas
router.get("/:id/styles",
    validateSchema(productStyleIdParamSchema, "params"),
    list
);

router.post("/:id/styles",
    validateSchema(productStyleIdParamSchema, "params"),
    validateSchema(productStyleCreateSchema, "body"),
    create
);

router.delete("/:id/styles/:styleId",
    validateSchema(productStyleParamsSchema, "params"),
    destroy
);

module.exports = router;
