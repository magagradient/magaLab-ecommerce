const express = require('express');
const router = express.Router();

// controllers
const index = require("../controllers/themes/get/index");
const show = require("../controllers/themes/get/show");

const create = require("../controllers/themes/post/create");

const update = require("../controllers/themes/put/update");

const destroy = require("../controllers/themes/delete/destroy");

// rutas
router.get("/", index);
router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
