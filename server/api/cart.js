const express = require('express')
const router = express.Router()
const {Product, User, CartHeader, CartDetail} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cartHeader = await CartHeader.findOne({
      where: {userId: req.params.userId}
    })
    const cartDetail = await CartDetail.findAll({
      where: {CartHeaderId: cartHeader.id}
    })
    res.send(cartDetail)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const cartHeader = await CartHeader.findOne({
      where: {userId: req.params.userId}
    })
    await CartDetail.destroy({
      where: {CartHeaderId: cartHeader.id}
    })
    await CartHeader.destroy({
      where: {userId: req.params.userId}
    })
    res.send('deleted')
  } catch (err) {
    next(err)
  }
})

// router.post('/:userId/products', async (req, res, next) => {
//   try {
//     const cartHeader = await CartHeader.findOrCreate({
//       where: {userId: req.params.userId}
//     })
//     console.log('===============>', cartHeader)
//     // const cartDetail = await CartDetail.
//     res.send(cartHeader)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
