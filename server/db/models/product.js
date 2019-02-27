const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/productDefault.png'
  },
  price: {
    type: Sequelize.DECIMAL(18, 2),
    allowNull: false,
    validate: {
      min: 2
    }
  }
})

module.exports = Product
