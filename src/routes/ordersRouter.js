const express = require("express");
const router = express.Router();

// Controllers
const index = require("../controllers/orders/get/index");
const show = require("../controllers/orders/get/show");
const byUser = require("../controllers/orders/get/byUser");

const create = require("../controllers/orders/post/create");

const update = require("../controllers/orders/put/update");

const destroy = require("../controllers/orders/delete/destroy");


// Routes
router.get("/", index);
router.get("/:id", show);
router.get("/user/:id_user", byUser);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
