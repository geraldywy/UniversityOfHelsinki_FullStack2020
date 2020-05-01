const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
const User = require('../models/user')
const token = helper.userToken

beforeEach(async ()=>{
  await Blog.deleteMany({})

  const blogObjects = helper.blogs.map(blog=> new Blog(blog))
  const promiseArray = blogObjects.map(blog=>blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const userObjects = helper.users.map(user=> new User(user))
  const promiseArray2 = userObjects.map(user=>user.save())
  await Promise.all(promiseArray2)
})

test('retrieve all blogs', async ()=>{
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength((await helper.blogsInDb()).length)
})

test('verify id of blog is defined', async ()=>{
    const response = await api.get('/api/blogs')
    const noteToCheck = response.body[0]
    expect(noteToCheck.id).toBeDefined()
})

test('adding a new blog is okay', async ()=>{
    const newBlog = {
        "title": "get rekt",
        "author": "meme",
        "url": "lmfao.com",
        "likes": 0
    }
    
    await api.post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length+1)
    const titles = blogsAtEnd.map(b=>b.title)
    expect(titles).toContain(newBlog.title)
})

test('missing likes field defaults to 0', async ()=>{
    const blogNoLikes = {
        "title": "lmfao",
        "author": "notme",
        "url": "workinglol.com"
    }
    const response = await api.post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
        .send(blogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const savedBlog = response.body
    expect(savedBlog.likes).toBe(0)
})

test('missing title and url gives 400', async ()=>{
    const invalidBlog = {
        "author": "el hombre",
        "likes": 999
    }
    await api.post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
        .send(invalidBlog)
        .expect(400)
})

test('deleting a note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.blogs.length-1)
    expect(blogsAtEnd.map(b=>b.title)).not.toContain(blogToDelete.title)
})

test('updating a note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initalLikes = blogToUpdate.likes
    blogToUpdate.likes = initalLikes - 1
    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
                        .send(blogToUpdate)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
    updatedBlog = response.body
    expect(updatedBlog.likes).toBe(initalLikes-1)
})

afterAll(()=>{
    mongoose.connection.close()
})