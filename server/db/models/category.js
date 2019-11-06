const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    // same thing w/ enum. maybe put it on the product table?
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Chair', 'Table']]
    }
  }
})

module.exports = Category
