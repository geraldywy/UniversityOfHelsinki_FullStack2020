const blogsRouter = require('express').Router()
const Blog = require('../models/blog') // our blog database
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog=>blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  if (!token) {
    return response.status(401).json({error: "token missing"})
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({error: "token invalid"})
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes || 0,
    "user": user,
    "comments": []
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
  })

  

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({error: "token missing"})
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({error: "token invalid"})
  }
  
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (!blog){
    return response.status(404).json({error: "blog not found"})
  }
  else if (!(user.blogs.includes(request.params.id))){
    return response.status(401).json({error: "you do not have permission to delete this blog"})
  }

  user.blogs = user.blogs.filter(id=>id!=request.params.id)
  await user.save()
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "comments": body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
  response.json(updatedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).catch(error=>{
    next(error)
  })
  if (!blog){
    return response.status(404).end()
  }
  response.status(200).json(blog.toJSON())
  
})


module.exports = blogsRouter