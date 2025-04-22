const express = require('express');
const router = express.Router();

const controller = require('../controllers/userCouponsController');


router.get("/", controller.index);
router.get("/:id_user_coupon", controller.show);
router.post("/", controller.create);
router.put("/:id_user_coupon", controller.update);
router.delete("/:id_user_coupon", controller.destroy);


module.exports = router;
