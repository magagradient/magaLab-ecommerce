const express = require('express');
const router = express.Router();

const controller = require('../controllers/productColorsController')

router.get("/", controller.index);
router.get("/:id_product/:id_color", controller.show);
router.post("/", controller.create);
router.delete("/:id_product/:id_color", controller.destroy);

module.exports = router; 