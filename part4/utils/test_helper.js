const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
      user: "5ea1271b5cd000416067afc0"
    }
  ]
  
const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0, user: "5ea1271b5cd000416067afc0" }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0, user: "5ea1271b5cd000416067afc0" }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0, user: "5ea1271b5cd000416067afc0" }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0, user: "5ea1271b5cd000416067afc0" }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0, user: "5ea1271b5cd000416067afc0" }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0, user: "5ea129a38c53621098bb5d3e" }
]

const blogsId = blogs.map(blog=>blog._id).slice(0, blogs.length-1)

const users = [
  {
    _id:"5ea1271b5cd000416067afc0",
    username:"newuser11",
    name:"lolol",
    passwordHash:"$2b$10$eqazkqOQKTddi4iDUS4Z0OLYYRsdqfcUKK1WaW.sIuSKWcfd7XzK6",
    __v:0,
    blogs: blogsId
  },
  {
    _id:"5ea129a38c53621098bb5d3e",
  username:"111",
  name:"geral",
  passwordHash:"$2b$10$1loSAkkZOv7yLW0aIMwlyuEvMeLZaOGdU7ayhY33fjU9SitMiloku",
  __v:0,
  blogs: blogs.slice(blogs.length-1)
  }
]

const user = users[0]
const userForToken = {
  username: user.username,
  id: user._id
}
const userToken = jwt.sign(userForToken, process.env.SECRET)

const blogsInDb =  async () =>{
    const blogs = await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user=>user.toJSON())
}


module.exports = {
    listWithOneBlog,
    blogs,
    user,
    userToken,
    users,
    blogsInDb,
    usersInDb
}