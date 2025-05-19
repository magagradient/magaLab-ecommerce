const express = require('express');
const router = express.Router();

// controllers:
const index = require("../controllers/userCoupons/get/index");
const show = require("../controllers/userCoupons/get/show");

const create = require("../controllers/userCoupons/post/create");

const update = require("../controllers/userCoupons/put/update");

const destroy = require("../controllers/userCoupons/delete/destroy");



// rutas
router.get("/", index);
router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);


module.exports = router;
