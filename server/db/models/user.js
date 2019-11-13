const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://image.shutterstock.com/image-vector/man-head-silhouette-vector-260nw-183510548.jpg'
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.afterCreate(async user => {
  try {
    const order = await Order.create()
    order.userId = user.id
    await order.save()
  } catch (error) {
    console.log(error)
  }
})
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
