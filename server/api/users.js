const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:id/edit', async (req, res, next) => {
  try {
    const user = User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/edit', async (req, res, next) => {
  try {
    const user = User.findById(req.params.id)
    const updatedUser = user.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = User.create(req.body)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
