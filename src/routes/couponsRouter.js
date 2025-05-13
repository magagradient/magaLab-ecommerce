const express = require('express');
const router = express.Router();

// GET
const index = require("../controllers/coupons/get/index");
const userCoupons = require("../controllers/coupons/get/userCoupons");
const show = require("../controllers/coupons/get/show");

// POST
const create = require("../controllers/coupons/post/create");
const applyCoupon = require("../controllers/coupons/post/applyCoupon");

// PUT
const update = require("../controllers/coupons/put/update");

// DELETE
const destroy = require("../controllers/coupons/delete/detroy");


/* --------------------------------------- */

// GET 
router.get("/", index);
router.get("/users/:userId/coupons", userCoupons);
router.get("/:id", show);

// POST 
router.post("/", create);
router.post("/users/:userId/coupons/:couponId", applyCoupon);

// PUT 
router.put("/:id", update);

// DELETE 
router.delete("/:id", destroy);


module.exports = router; 