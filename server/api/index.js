const router = require('express').Router()
module.exports = router

const loggedIn = (req, res, next) => {
  console.log('loggedIn')
  console.log(req.user.id)
  if (!req.user) {
    let err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }
  next()
}

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', loggedIn, require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
