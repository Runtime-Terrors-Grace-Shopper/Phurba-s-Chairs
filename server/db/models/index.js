const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

User.hasMany(Order)
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Product, {as: 'product'})

module.exports = {
  User,
  Product,
  Order,
  OrderProduct
}
