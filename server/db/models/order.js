const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const OrderProduct = require('./orderProduct')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditCard: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Active',
    validate: {
      isIn: [['Completed', 'Active']]
    }
  }
})

Order.getActiveOrder = async user => {
  try {
    const data = await Order.findOne({
      where: {
        userId: user.id,
        status: 'Active'
      },
      include: [{model: OrderProduct}]
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

Order.prototype.addProducts = async function(guestCart) {
  /// take this this.id
  /// create new guestCart with that OrderId and those ProductIds
  //// check to see if productId exist in the active order, don't do anything, other wise add the product
  try {
    const orderId = this.id
    const userCart = this.orderProducts
    let updated = false
    for (let i = 0; i < guestCart.length; i++) {
      updated = false
      for (let j = 0; j < userCart.length; j++) {
        if (guestCart[i].productId === userCart[j].productId) {
          userCart[i].quantity += guestCart[i].quantity
          updated = true
          break
        }
      }
      if (!updated) {
        const orderProduct = await OrderProduct.create({
          orderId,
          productId: guestCart[i].productId,
          quantity: guestCart[i].quantity,
          purchasingPrice: guestCart[i].purchasingPrice
        })
        userCart.push(orderProduct)
      }
    }
    console.log('The userCart is ------>', userCart)
    return userCart
  } catch (error) {
    console.log(error)
  }
}

module.exports = Order
