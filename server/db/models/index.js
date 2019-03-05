const User = require('./user')
const Product = require('./product')
const Address = require('./address')
const Order = require('./order')

User.hasOne(Address)
Address.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Order)
Order.belongsTo(Product)

module.exports = {
  User,
  Product,
  Address,
  Order
}
