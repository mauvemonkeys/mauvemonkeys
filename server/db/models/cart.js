const Sequelize = require('sequelize')
const db = require('../db')

const CartHeader = db.define('CartHeader', {})

const CartDetail = db.define('CartDetail', {
  Quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = {CartHeader, CartDetail}
// module.exports = CartDetail
