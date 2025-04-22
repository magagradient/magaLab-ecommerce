const express = require('express');
const router = express.Router();

const controller = require('../controllers/authorsController')

router.get('/', controller.index);
router.get("/search/:query", controller.search);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
