const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Invoices = sequelize.define('Invoices', {
        id_invoice: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        invoice_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        issued_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'invoices',
        timestamps: false
    });

    return Invoices;
};
