const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");
const idParamSchema = require("../validators/shared/idParamSchema");

const {
    createUserCouponSchema,
    updateUserCouponSchema
} = require("../validators/userCoupons");

// controllers:
const index = require("../controllers/userCoupons/get/index");
const show = require("../controllers/userCoupons/get/show");

const create = require("../controllers/userCoupons/post/create");

const update = require("../controllers/userCoupons/put/update");

const destroy = require("../controllers/userCoupons/delete/destroy");

// rutas
router.get("/", authMiddleware, index);

router.get("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    show
);

router.post("/",
    authMiddleware,
    validateSchema(createUserCouponSchema, "body"),
    create
);

router.put("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(updateUserCouponSchema, "body"),
    update
);

router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
