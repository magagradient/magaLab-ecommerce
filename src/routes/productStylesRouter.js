const express = require('express');
const router = express.Router();

const controller = require('../controllers/productStylesController');

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.put('/:id_product/:id_style', controller.update);

router.delete("/:id_product/:id_style", controller.destroy);

module.exports = router;
