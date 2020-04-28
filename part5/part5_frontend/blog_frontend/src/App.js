import React, { useState, useEffect } from 'react'

import './App.css'
import './index.css'

import loginService from './services/login'
import blogService from './services/blogs'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const defaultNotification = { message: null, error: null }
  const [notification, setNotification] = useState(defaultNotification)

  useEffect(() => {
    // populating blogs from api
    const fetchData = async () => {
      const blogs = await blogService.getBlogs()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('checking local window storage')
    const loggedUserJSON = window.localStorage.getItem('goodUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username, password)
    try {
      const user = await loginService.login({ username, password })
      console.log('successful login, welcome', user.name)

      window.localStorage.setItem('goodUser', JSON.stringify(user))
      setUser(user)
      setNotification({
        message: `Welcome ${user.name}`,
        error: false,
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('invalid credentials!')
      setNotification({
        message: 'invalid username or password',
        error: true,
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2 id="loginDisplay" >Login</h2>
      <form onSubmit={handleLogin}>
        username
        <input
          id='usernameField'
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          id='passwordField'
          type="text"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button id='loginButton' type="submit">Login</button>
      </form>
    </div>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('goodUser')
    console.log('logged out')
    setNotification({
      message: 'Logged out successfully',
      error: false,
    })
    setTimeout(() => {
      setNotification(defaultNotification)
    }, 5000)
  }

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNotification({
        message: `${addedBlog.title} has been successfully added!`,
        error: false,
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
    } catch (exception) {
      setNotification({
        message: 'title, author, url are required',
        error: true,
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
    }
  }

  const createBlogform = () => (
    <Togglable buttonLabel="Add a new blog">
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const addLike = async (blog) => {
    const updatedBlog = await blogService.addOneLike(blog)
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (
        window.confirm(
          `Delete ${blogToDelete.title} by ${blogToDelete.author}?`
        )
      ) {
        await blogService.deleteBlog(blogToDelete)
        setBlogs(blogs.filter((blog) => blog !== blogToDelete))
      }
    } catch (exception) {
      setNotification({
        message: 'Not authorized to delete this post',
        error: true,
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notifObj={notification} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification notifObj={notification} />

      <h2>Welcome {user.name}</h2>
      <button onClick={handleLogout}>Log out</button>

      {createBlogform()}

      <ul id='blogs'>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
