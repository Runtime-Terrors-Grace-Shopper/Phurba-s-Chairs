const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Category = require('./category')
const OrderProduct = require('./orderProduct')

User.hasMany(Order)
Product.belongsTo(Category)
Order.belongsToMany(Product, {
  through: 'orderProduct',
  foreignKey: 'orderId'
})
Product.belongsToMany(Order, {
  through: 'orderProduct',
  foreignKey: 'productId'
})

module.exports = {
  User,
  Product,
  Order,
  Category,
  OrderProduct
}
