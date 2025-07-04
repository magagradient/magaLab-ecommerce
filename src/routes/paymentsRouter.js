const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
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
// Rutas protegidas
router.get("/", authMiddleware, index);

router.post("/",
    authMiddleware,
    validateSchema(paymentCreateSchema, "body"),
    create
);

router.put("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(paymentUpdateSchema, "body"),
    update
);

router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);
module.exports = router;