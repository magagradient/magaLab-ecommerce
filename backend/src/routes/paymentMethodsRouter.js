const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

// Schemas
const idParamSchema = require("../validators/shared/idParamSchema");
const paymentMethodCreateSchema = require("../validators/paymentMethods/paymentMethodCreateSchema");
const paymentMethodUpdateSchema = require("../validators/paymentMethods/paymentMethodUpdateSchema");

// Controladores
const index = require("../controllers/paymentMethods/get/index");
const create = require("../controllers/paymentMethods/post/create");
const update = require("../controllers/paymentMethods/put/update");
const destroy = require("../controllers/paymentMethods/delete/destroy");

// Rutas
router.get("/", authMiddleware, index);

router.post("/",
    authMiddleware,
    validateSchema(paymentMethodCreateSchema, "body"),
    create
);

router.put("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(paymentMethodUpdateSchema, "body"),
    update
);

router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
