const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");
const {
  paymentCreateSchema,
  paymentUpdateSchema,
  idParamSchema
} = require("../validators/payments");


// Controllers
const index = require("../controllers/payments/get/index");
const create = require("../controllers/payments/post/create");
const createMercadoPagoPreference = require("../controllers/payments/post/createMercadoPago");
const createPayPalOrder = require("../controllers/payments/post/createPayPal");
const webhookMercadoPago = require("../controllers/payments/post/webhookMercadoPago");
const webhookPayPal = require("../controllers/payments/post/webhookPayPal");
const update = require("../controllers/payments/put/update");
const destroy = require("../controllers/payments/delete/destroy");


// Rutas
// Rutas protegidas
router.get("/", authMiddleware(), index);

router.post("/",
  authMiddleware(),
  validateSchema(paymentCreateSchema, "body"),
  create
);

router.post("/mercadopago/preference",
  authMiddleware(),
  createMercadoPagoPreference
);

router.post("/paypal/order",
  authMiddleware(),
  createPayPalOrder
);

router.post("/webhook/mercadopago", 
  webhookMercadoPago
);

router.post("/webhook/paypal",
  webhookPayPal
);

router.put("/:id",
  authMiddleware(),
  validateSchema(idParamSchema, "params"),
  validateSchema(paymentUpdateSchema, "body"),
  update
);

router.delete("/:id",
  authMiddleware(),
  validateSchema(idParamSchema, "params"),
  destroy
);
module.exports = router;