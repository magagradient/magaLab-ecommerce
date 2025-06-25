const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const idParamSchema = require('../validators/shared/idParamSchema');
const {
    userIdParamSchema,
    productIdParamSchema
} = require("../validators/downloadLinks/paramsSchema");

const createDownloadLinkSchema = require("../validators/downloadLinks/createDownloadLinkSchema");
const updateDownloadLinkSchema = require("../validators/downloadLinks/updateDownloadLinkSchema");

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
router.get('/user/:id_user', validateSchema(userIdParamSchema, "params"), byUser);
router.get('/product/:id_product', validateSchema(productIdParamSchema, "params"), downloadLinkForProduct);
router.get('/', allDownloadLinks);
router.get("/:id", validateSchema(idParamSchema, "params"), byId);

// post
router.post("/", validateSchema(createDownloadLinkSchema), create);

// put
router.put('/:id', validateSchema(idParamSchema, "params"), validateSchema(updateDownloadLinkSchema), update);

// delete
router.delete('/:id', validateSchema(idParamSchema, "params"), destroy);

module.exports = router; 
