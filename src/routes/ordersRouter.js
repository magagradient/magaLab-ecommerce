const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const {
    orderCreateSchema,
    orderUpdateSchema,
    idParamSchema,
    userIdParamSchema
} = require("../validators/orders");


// Controllers
const index = require("../controllers/orders/get/index");
const show = require("../controllers/orders/get/show");
const byUser = require("../controllers/orders/get/byUser");

const create = require("../controllers/orders/post/create");

const update = require("../controllers/orders/put/update");

const destroy = require("../controllers/orders/delete/destroy");


// Routes
router.get("/", index);

router.get("/:id",
    validateSchema(idParamSchema, "params"),
    show
);

router.get("/user/:id_user",
    validateSchema(userIdParamSchema, "params"),
    byUser
);

router.post("/",
    validateSchema(orderCreateSchema, "body"),
    create
);

router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(orderUpdateSchema, "body"),
    update
);

router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
