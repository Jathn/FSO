const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!body.user || !body.title || !body.url) {
    return response.status(400).json({ error: 'user missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id === undefined ? "" : user.id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }
  if (blog.user !== request.user.toString()) {
    return response.status(403).json({ error: 'only the creator can remove the blog' });
  }

  await Blog.findByIdAndDelete(blog.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).end()

})

module.exports = blogsRouter