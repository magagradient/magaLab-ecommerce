const express = require('express');
const router = express.Router();

const controller = require('../controllers/productKeywordsController')

router.get('/', controller.index);
router.get("/:id_product/:id_keyword", controller.show);
router.post("/", controller.create);
router.delete("/:id_product/:id_keyword", controller.destroy);

module.exports = router; 