const express = require('express');
const router = express.Router();

const controller = require('../controllers/blogPostsController')

router.get('/', controller.index);
router.get("/:id", controller.show); 
router.get('/search/:query', controller.search);
router.post("/", controller.create);      
router.put("/:id", controller.update);   
router.delete("/:id", controller.destroy);

module.exports = router; 