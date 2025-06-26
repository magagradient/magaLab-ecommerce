const express = require('express');
const router = express.Router();

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
router.get("/", index);

router.get("/:id",
    validateSchema(idParamSchema, "params"),
    show
);

router.post("/",
    validateSchema(createUserCouponSchema, "body"),
    create
);

router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateUserCouponSchema, "body"),
    update
);

router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    destroy
);


module.exports = router;
