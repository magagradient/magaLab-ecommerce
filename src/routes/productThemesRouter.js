const express = require('express');
const router = express.Router();

const controller = require('../controllers/productThemesController');

router.get("/", controller.index);
router.get('/search', controller.search);
router.get("/:id_product/:id_theme", controller.show);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/:id_product/:id_theme", controller.destroy);


module.exports = router;

