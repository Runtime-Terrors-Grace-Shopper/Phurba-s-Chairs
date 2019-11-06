const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    // validates
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2), // be veryyyyyy careful with calculating prices
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  color: {
    type: Sequelize.STRING
  }
})

module.exports = Product
