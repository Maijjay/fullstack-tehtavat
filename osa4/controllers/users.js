
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
  response.json(users)
}) 

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3){
    return response.status(400).json({
        error: 'password too short'
      })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  user
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
  
})

module.exports = usersRouter