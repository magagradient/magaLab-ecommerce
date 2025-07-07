const sequelize = require("../connection/connection");
const { DataTypes } = require("sequelize");
const relations = require("../database/relations/indexRelations");

// modelos:

// Blog:
const AuthorsModel = require("../models/authors");
const BlogPostsModel = require("../models/blog_posts");

// Productos:
const ProductsModel = require("../models/products");
const CategoriesModel = require("../models/categories");
const ProductColorsModel = require("../models/product_colors");
const ProductImagesModel = require("../models/product_images");
const ProductKeywordsModel = require("../models/product_keywords");
const ProductStylesModel = require("../models/product_styles");
const ProductThemesModel = require("../models/product_themes");

// Atributos :
const ColorsModel = require("../models/colors");
const StylesModel = require("../models/styles");
const KeywordsModel = require("../models/keywords");
const SeriesModel = require("../models/series");
const ThemesModel = require("../models/themes");

// Usuarios:
const UsersModel = require("../models/users");
const PasswordChangesModel = require("../models/password_changes");
const PasswordResetsModel = require("../models/password_resets");
const FavoriteImagesModel = require("../models/favorite_images");
const FavoriteSeriesModel = require("../models/favorite_series");
const UserCouponsModel = require("../models/user_coupons");

// Carritos y Órdenes:
const ShoppingCartsModel = require("../models/shopping_carts");
const CartItemsModel = require("../models/cart_items");
const OrdersModel = require("../models/orders");
const OrdersProductsModel = require("../models/orders_products");

// Pagos: 
const PaymentMethodsModel = require("../models/payment_methods");
const PaymentsModel = require("../models/payments");
const InvoicesModel = require("../models/invoices");

// Cupones y descargas: 
const CouponsModel = require("../models/coupons");
const DownloadLinksModel = require("../models/download_links");


// instanciar modelos:

const models = {
    Authors: AuthorsModel(sequelize, DataTypes),
    BlogPosts: BlogPostsModel(sequelize, DataTypes),
    CartItems: CartItemsModel(sequelize, DataTypes),
    Categories: CategoriesModel(sequelize, DataTypes),
    Colors: ColorsModel(sequelize, DataTypes),
    Coupons: CouponsModel(sequelize, DataTypes),
    DownloadLinks: DownloadLinksModel(sequelize, DataTypes),
    FavoriteImages: FavoriteImagesModel(sequelize, DataTypes),
    FavoriteSeries: FavoriteSeriesModel(sequelize, DataTypes),
    Invoices: InvoicesModel(sequelize, DataTypes),
    Keywords: KeywordsModel(sequelize, DataTypes),
    Orders: OrdersModel(sequelize, DataTypes),
    OrdersProducts: OrdersProductsModel(sequelize, DataTypes),
    PasswordChanges: PasswordChangesModel(sequelize, DataTypes),
    PasswordResets: PasswordResetsModel(sequelize, DataTypes),
    PaymentMethods: PaymentMethodsModel(sequelize, DataTypes),
    Payments: PaymentsModel(sequelize, DataTypes),
    ProductColors: ProductColorsModel(sequelize, DataTypes),
    ProductImages: ProductImagesModel(sequelize, DataTypes),
    ProductKeywords: ProductKeywordsModel(sequelize, DataTypes),
    ProductStyles: ProductStylesModel(sequelize, DataTypes),
    ProductThemes: ProductThemesModel(sequelize, DataTypes),
    Products: ProductsModel(sequelize, DataTypes),
    Series: SeriesModel(sequelize, DataTypes),
    ShoppingCarts: ShoppingCartsModel(sequelize, DataTypes),
    Styles: StylesModel(sequelize, DataTypes),
    Themes: ThemesModel(sequelize, DataTypes),
    UserCoupons: UserCouponsModel(sequelize, DataTypes),
    Users: UsersModel(sequelize, DataTypes),
};

// relaciones: 

relations(models)



// conexion a base de datos: 

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("✅ Base de datos conectada con éxito");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
};

// exportar:

module.exports = { sequelize, connectDB, ...models };


