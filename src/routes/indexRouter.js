const express = require("express");

const authorsRouter = require("./authorsRouter");
const productsRouter = require("./productsRouter");
const blogPostsRouter = require("./blogPostsRouter");
const cartItemsRouter = require("./cartItemsRouter")
const categoriesRouter = require("./categoriesRouter"); 
const colorsRouter = require("./colorsRouter");
const couponsRouter = require("./couponsRouter");
const downloadLinksRouter = require("./downloadLinksRouter");
const favoriteImagesRouter = require("./favoriteImagesRouter") 
const favoriteSeriesRouter = require("./favoriteSeriesRouter") 
const invoicesRouter = require("./invoicesRouter")
const keywordsRouter = require("./keywordsRouter");
const ordersRouter = require("./ordersRouter");
const ordersProductsRouter = require("./ordersProductsRouter");
const passwordChangesRouter = require("./passwordChangesRouter");
const usersRouter = require("./usersRouter");
const passwordResetsRouter = require("./passwordResetsRouter");
const paymentMethodsRouter = require("./paymentMethodsRouter");
const paymentsRouter = require("./paymentsRouter");
const productColorsRouter = require("./productColorsRouter");
const productImagesRouter = require("./productImagesRouter");
const productKeywordsRouter = require("./productKeywordsRouter");
const productStylesRouter = require("./productStylesRouter");
const productVariantsRouter = require("./productVariantsRouter");
const seriesRouter = require("./seriesRouter")
const stylesRouter = require("./stylesRouter");
const shoppingCartsRouter = require("./shoppingCartsRouter");
const themesRouter = require("./themesRouter");
const productThemesRouter = require("./productThemesRouter");
const userCouponsRouter = require("./userCouponsRouter");


const router = express.Router();


router.use("/authors", authorsRouter);
router.use("/products", productsRouter);
router.use("/blog_posts", blogPostsRouter);
router.use("/cart_items", cartItemsRouter)
router.use("/categories", categoriesRouter);
router.use("/colors", colorsRouter);
router.use("/coupons", couponsRouter);
router.use("/download_links", downloadLinksRouter);
router.use("/favorite_images", favoriteImagesRouter)
router.use("/favorite_series", favoriteSeriesRouter)
router.use("/invoices", invoicesRouter);
router.use("/keywords", keywordsRouter);
router.use("/orders", ordersRouter);
router.use("/orders_products", ordersProductsRouter);
router.use("/password_changes", passwordChangesRouter);
router.use("/users", usersRouter);
router.use("/password_resets", passwordResetsRouter);
router.use("/payment_methods", paymentMethodsRouter);
router.use("/payments", paymentsRouter);
router.use("/product_colors", productColorsRouter);
router.use("/product_images", productImagesRouter);
router.use("/product_keywords", productKeywordsRouter);
router.use("/product_styles", productStylesRouter);
router.use("/product_variants", productVariantsRouter);
router.use("series", seriesRouter);
router.use("/styles", stylesRouter);
router.use("/shopping_carts", shoppingCartsRouter);
router.use("/themes", themesRouter);
router.use("/product_themes", productThemesRouter);
router.use("/user_coupons", userCouponsRouter);


module.exports = router;
