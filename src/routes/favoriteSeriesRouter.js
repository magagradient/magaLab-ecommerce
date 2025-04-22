const express = require("express");
const router = express.Router();

const controller = require("../controllers/favoriteSeriesController");

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.delete("/:id", controller.destroy);

module.exports = router;
