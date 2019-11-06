const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING, // proper validations
    allowNull: false
  },
  creditCard: {
    type: Sequelize.STRING, // neverrrrrrr store a credit card in the database!!!!!!!!!
    allowNull: false
  },
  status: {
    // works, but there's a better way (in my opinion) to do this w/ an enum
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Active',
    validate: {
      isIn: [['Completed', 'Active']]
    }
  }
})

module.exports = Order
