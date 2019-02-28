const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.put('/editUser', async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id)

    delete req.body.id

    let newReqBody = {}
    for (let key in req.body) {
      if (req.body[key] !== '') {
        newReqBody[key] = req.body[key]
      }
    }

    const updatedUser = await user.update(newReqBody)
    await updatedUser.save()
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
