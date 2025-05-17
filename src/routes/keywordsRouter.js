const express = require("express");
const router = express.Router();

// Controllers
const index = require("../controllers/keywords/get/index");
const show = require("../controllers/keywords/get/show");

const create = require("../controllers/keywords/post/create");

const update = require("../controllers/keywords/put/update");

const destroy = require("../controllers/keywords/delete/destroy");

// Routes
router.get("/", index);
router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
