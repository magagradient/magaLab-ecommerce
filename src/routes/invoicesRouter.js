const express = require("express");
const router = express.Router();

// get
const index = require("../controllers/invoices/get/index");
const show = require("../controllers/invoices/get/show");

// post
const create = require("../controllers/invoices/post/create");

// put
const update = require("../controllers/invoices/put/update");

// delete
const destroy = require("../controllers/invoices/delete/destroy");

// rutas

// GET
router.get("/", index);            
router.get("/:id", show);        

// POST 
router.post("/", create);        

// PUT 
router.put("/:id", update);      

// DELETE 
router.delete("/:id", destroy);   

module.exports = router;


