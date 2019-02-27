const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('Address', {
  streetAddress: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  }
})

module.exports = Address
