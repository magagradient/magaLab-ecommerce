const express = require("express");
const router = express.Router();

// Controllers
const index = require("../controllers/ordersProducts/get/index");
const byOrder = require("../controllers/ordersProducts/get/byOrder");

const create = require("../controllers/ordersProducts/post/create");

const update = require("../controllers/ordersProducts/put/update");

const destroy = require("../controllers/ordersProducts/delete/destroy");

// Routes
router.get("/", index);
router.get("/:id_order", byOrder);

router.post("/", create);

router.put("/:id_order/:id_product", update);

router.delete("/:id_order/:id_product", destroy);

module.exports = router;
