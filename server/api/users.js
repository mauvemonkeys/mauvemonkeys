const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// router.put('/:id/edit', async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id)
//     const updatedUser = await user.update(req.body)
//     await updatedUser.save()
//     res.json(updatedUser)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone || null
    })
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
