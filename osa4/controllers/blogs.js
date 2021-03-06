
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  try {
    const blog = new Blog({
      title : body.title,
      author : body.author,
      url : body.url,
      likes : body.likes,
      user : user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (ecxeption) {
    next(ecxeption)
  } 
})

blogsRouter.delete('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'No authorization to remove blog' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const updatedBlog = {
      title : body.title,
      author : body.author,
      url : body.url,
      likes : body.likes,
      user : body.user
    }
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    response.sendStatus(204)
    
  } catch (ecxeption) {
      next(ecxeption)
  } 
})

module.exports = blogsRouter
