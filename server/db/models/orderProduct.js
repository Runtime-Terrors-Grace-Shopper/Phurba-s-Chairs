const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    // not sure you need to concretely define these thanks to the associations
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  purchasingPrice: {
    // worth thinking "do I need this?"
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.0
    }
  }
})

module.exports = OrderProduct
