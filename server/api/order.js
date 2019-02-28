const express = require('express')
const router = express.Router()
const {Product, Order} = require('../db/models')

module.exports = router

router.param('userId', (req, res, next, userId) => {
  if (Number(userId) !== req.user.id) {
    let err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }
  next()
})

router.get('/:userId', async (req, res, next) => {
  try {
    const orderLines = await Order.findAll({
      where: {userId: req.params.userId, orderStatus: false},
      include: [{model: Product}]
    })
    res.send(orderLines)
  } catch (err) {
    next(err)
  }
})

// Product detail and or update quantity in cart
router.put('/:userId/products/:productId', async (req, res, next) => {
  try {
    const result = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        orderStatus: false,
        productId: req.params.productId
      },
      defaults: {itemQuantity: req.body.itemQuantity},
      include: [{model: Product}]
    })

    let orderLine = result[0]
    const created = result[1]

    if (!created) {
      orderLine.itemQuantity = req.body.itemQuantity
      orderLine = await orderLine.save()
    }
    res.status(created ? 201 : 200).send(orderLine)
  } catch (err) {
    next(err)
  }
})

// Product delete
router.delete('/:userId/products/:productId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        userId: req.params.userId,
        orderStatus: false,
        productId: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
