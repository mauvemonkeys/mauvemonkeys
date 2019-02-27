const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  itemQuantity: {
    type: Sequelize.INTEGER
  },
  orderPrice: {
    type: Sequelize.DECIMAL(18, 2)
  },
  orderStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderTS: {
    type: Sequelize.DATE
  }
})

module.exports = Order
