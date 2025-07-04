const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
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

/////////////////////////////////////////////////////////////

// rutas
router.get("/", authMiddleware, index);

router.get("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    show
);

router.post("/",
    authMiddleware,
    validateSchema(invoiceCreateSchema, "body"),
    create
);

router.put("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(invoiceUpdateSchema, "body"),
    update
);

router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;


