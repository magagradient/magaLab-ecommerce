const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const {
    invoiceCreateSchema,
    invoiceUpdateSchema,
    idParamSchema
} = require("../validators/invoices");

// get
const index = require("../controllers/invoices/get/index");
const show = require("../controllers/invoices/get/show");

// post
const create = require("../controllers/invoices/post/create");

// put
const update = require("../controllers/invoices/put/update");

// delete
const destroy = require("../controllers/invoices/delete/destroy");

// rutas

// get
router.get("/", index);
router.get("/:id",
    validateSchema(idParamSchema, "params"),
    show
);

// post
router.post("/",
    validateSchema(invoiceCreateSchema, "body"),
    create
);

// put
router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(invoiceUpdateSchema, "body"),
    update
);

// delete
router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;


