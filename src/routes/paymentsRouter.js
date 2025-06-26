const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const {
    paymentCreateSchema,
    paymentUpdateSchema,
    idParamSchema
} = require("../validators/payments");


// Controllers
const index = require("../controllers/payments/get/index");
const create = require("../controllers/payments/post/create");
const update = require("../controllers/payments/put/update");
const destroy = require("../controllers/payments/delete/destroy");


// Rutas
router.get("/", index);

router.post("/", validateSchema(paymentCreateSchema, "body"), create);

router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(paymentUpdateSchema, "body"),
    update
);

router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;