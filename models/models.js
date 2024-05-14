const sequelize = require('../db')
const { DataTypes, INTEGER } = require('sequelize')

// const Employee = sequelize.define('employee', {
//     employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     first_name: { type: DataTypes.STRING },
//     last_name: { type: DataTypes.STRING },
//     surname: { type: DataTypes.STRING },
//     role: { type: DataTypes.STRING, defaultValue: "USER" },
//     position: { type: DataTypes.STRING },
//     department: { type: DataTypes.STRING },
//     email: { type: DataTypes.STRING, unique: true },
//     phone: { type: DataTypes.INTEGER },
// })

const User = sequelize.define('user', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING }, //нахуй мне это, если есть мыло
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING },
})

const Basket = sequelize.define('basket', {
    basket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketCar = sequelize.define('basket_car', {
    basket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Car = sequelize.define('car', {
    car_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    body_type: { type: DataTypes.STRING },
    engine_type: { type: DataTypes.STRING },
    engine_displacement: { type: DataTypes.STRING },
    engine_power: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
})

// const OtherCar = sequelize.define('other_car', {
//     car_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     brand: { type: DataTypes.STRING },
//     model: { type: DataTypes.STRING },
//     year: { type: DataTypes.STRING },
//     color: { type: DataTypes.STRING },
//     img: { type: DataTypes.STRING },
//     body_type: { type: DataTypes.STRING },
//     engine_type: { type: DataTypes.STRING },
//     engine_displacement: { type: DataTypes.STRING },
//     engine_power: { type: DataTypes.STRING },
//     price: { type: DataTypes.STRING },
// });

// const carInfo = sequelize.define('carInfo', {
//     title: { type: DataTypes.STRING },
//     description: { type: DataTypes.STRING },
//     price: { type: DataTypes.STRING },
// })

const Order = sequelize.define('order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_date: { type: DataTypes.DATE },
    order_price: { type: DataTypes.STRING },
})

const Supplier = sequelize.define('supplier', {
    supplier_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    company_name: { type: DataTypes.STRING },
    contact_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
})

const Supply = sequelize.define('supply', {
    supply_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    delivery_date: { type: DataTypes.STRING },
    delivery_cost: { type: DataTypes.STRING },
})

const Sale = sequelize.define('sale', {
    sale_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_sale: { type: DataTypes.STRING },
    cost_sale: { type: DataTypes.STRING },
})

const EmployeeSale = sequelize.define('employee_sale', {
    sale_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})


// const CarOrder = sequelize.define('car_order',{
//     carOrderId:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// }) 

Supplier.hasMany(Supply)
Supply.belongsTo(Supplier)

Car.hasMany(Supply, { as: 'info' });
Supply.belongsTo(Car);

Car.hasMany(Order)
Order.belongsTo(Car)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasOne(Sale)
Sale.belongsTo(Order)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketCar)
BasketCar.belongsTo(Basket)

// Employee.hasMany(Sale)
// Sale.belongsTo(Employee)

// Employee.hasMany(Order)
// Order.belongsTo(Employee)

// Employee.belongsToMany(Sale, { through: EmployeeSale })
// Sale.belongsToMany(Employee, { through: EmployeeSale })

module.exports = {
    Supplier,
    Supply,
    Car,
    // OtherCar,
    User,
    Order,
    Sale,
    // Employee,
    EmployeeSale,
    Basket
}
