const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const OrderProduct = require('./orderProduct')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
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
      include: [
        {
          model: OrderProduct,
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [
                'category',
                'color',
                'description',
                'name',
                'imageUrl',
                'price'
              ]
            }
          ]
        }
      ]
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

Order.prototype.addProducts = async function(guestCart) {
  try {
    const orderId = this.id
    const userCart = this.orderProducts

    let updated = false
    for (let i = 0; i < guestCart.length; i++) {
      updated = false
      for (let j = 0; j < userCart.length; j++) {
        if (guestCart[i].productId === userCart[j].productId) {
          let quantity = userCart[j].quantity + guestCart[i].quantity
          userCart[j].update({quantity})
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
        orderProduct.save()
        userCart.push(orderProduct)
      }
    }
    return userCart
  } catch (error) {
    console.log(error)
  }
}

Order.prototype.inCart = async function(productId) {
  let cart = this.orderProducts
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) return true
  }
  return false
}

Order.prototype.deleteItem = async function(itemId) {
  const toBeDestroyed = await OrderProduct.findOne({where: {id: itemId}})
  await toBeDestroyed.destroy
}

module.exports = Order
