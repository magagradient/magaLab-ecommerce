// relaciones del módulo de cupones

module.exports = (models) => {
    //UserCoupons relaciones directas
    models.UserCoupons.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "user"
    });

    models.UserCoupons.belongsTo(models.Coupons, {
        foreignKey: "id_coupon",
        as: "coupon"
    });

    // (opcional: si quiero tener acceso desde Users y Coupons)
    models.Users.hasMany(models.UserCoupons, {
        foreignKey: "id_user",
        as: "userCoupons"
    });

    models.Coupons.hasMany(models.UserCoupons, {
        foreignKey: "id_coupon",
        as: "couponUsers"
    });
};