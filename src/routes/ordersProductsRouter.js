const express = require('express');
const router = express.Router();

const controller = require('../controllers/ordersProductsController')

router.get("/", controller.index);
router.get("/:id_order/:id_product", controller.show);
router.post("/", controller.create);
router.put("/:id_order/:id_product", controller.update);
router.delete("/:id_order/:id_product", controller.destroy);


module.exports = router; 
