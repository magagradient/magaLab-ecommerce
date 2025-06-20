const express = require('express');
const router = express.Router();

// Middlewares
const validateSchema = require("../middlewares/validateSchema");

// Schemas
const idParamSchema = require("../validators/shared/idParamSchema");
const createCouponSchema = require("../validators/coupons/createCouponSchema");
const updateCouponSchema = require("../validators/coupons/updateCouponSchema");
const userCouponParamsSchema = require("../validators/coupons/userCouponParamsSchema");

// Controllers
const index = require("../controllers/coupons/get/index");
const userCoupons = require("../controllers/coupons/get/userCoupons");
const show = require("../controllers/coupons/get/show");

const create = require("../controllers/coupons/post/create");
const applyCoupon = require("../controllers/coupons/post/applyCoupon");

const update = require("../controllers/coupons/put/update");

const destroy = require("../controllers/coupons/delete/detroy");

/* --------------------------------------- */

// GET
router.get("/", index);
router.get("/users/:userId/coupons",
    validateSchema(userCouponParamsSchema, "params"),
    userCoupons
);
router.get("/:id",
    validateSchema(idParamSchema, "params"),
    show
);

// POST
router.post("/",
    validateSchema(createCouponSchema, "body"),
    create
);
router.post("/users/:userId/coupons/:couponId",
    validateSchema(userCouponParamsSchema, "params"),
    applyCoupon
);

// PUT
router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateCouponSchema, "body"),
    update
);

// DELETE
router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
