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

    for (let i = 0; i < guestCart.length; i++) {
      let updated = false
      if (userCart.length === 0) {
        return guestCart
      } else {
        for (let j = 0; j < userCart.length; j++) {
          if (guestCart[i].productId === userCart[j].productId) {
            let quantity = userCart[j].quantity + guestCart[i].quantity
            await userCart[j].update({quantity})
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
          updatedItem = await OrderProduct.findOne({
            where: {
              orderId
            },
            include: [{model: Product, as: 'product'}]
          })
          userCart.push(updatedItem)
        }
      }
    }
    // console.log('inside order', userCart)
    return userCart
  } catch (error) {
    console.log(error)
  }
}

Order.prototype.inCart = function(productId) {
  let cart = this.orderProducts
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) return true
  }
  return false
}

Order.prototype.deleteItem = async function(itemId) {
  try {
    const toBeDestroyed = await OrderProduct.findOne({where: {id: itemId}})
    await toBeDestroyed.destroy
  } catch (error) {
    console.log(error)
  }
}

module.exports = Order
