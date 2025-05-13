const express = require('express');
const router = express.Router();

// get
const byUser = require("../controllers/downloadLinks/get/byUser");
const downloadLinkForProduct = require("../controllers/downloadLinks/get/downloadLinkForProduct");
const allDownloadLinks = require("../controllers/downloadLinks/get/allDownloadLinks");
const byId = require("../controllers/downloadLinks/get/byId");

// post
const create = require("../controllers/downloadLinks/post/create");

// put
const update = require("../controllers/downloadLinks/put/update");

// delete
const destroy = require("../controllers/downloadLinks/delete/destroy");

/* ------------------------------------------------------ */

// get
router.get('/user/:userId', byUser);
router.get('/product/:productId', downloadLinkForProduct);
router.get('/', allDownloadLinks);
router.get("/:id", byId);


// post
router.post("/", create); 

// put
router.put('/:id', update);

// delete
router.delete('/:id', destroy);


module.exports = router; 
