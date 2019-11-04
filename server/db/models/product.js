const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  categoryID: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  color: {
    type: Sequelize.STRING
  }
})

module.exports = Product
