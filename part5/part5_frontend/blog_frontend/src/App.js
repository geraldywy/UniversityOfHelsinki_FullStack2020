import React, {useState, useEffect} from 'react'
import './App.css'
import './index.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const defaultNotification = {message:null, error: null}
  const [notification, setNotification] = useState(defaultNotification)

  useEffect(() => {
    //populating blogs from api
    const fetchData = async () => {
      const blogs = await blogService.getBlogs()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('checking local window storage')
    const loggedUserJSON = window.localStorage.getItem('goodUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username, password)
    try{
      const user = await loginService.login({username, password})
      console.log('successful login, welcome', user.name)
      
      window.localStorage.setItem('goodUser', JSON.stringify(user))
      setUser(user)
      setNotification({
        message: `Welcome ${user.name}`,
        error: false
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    }
    catch(exception){
      console.log('invalid credentials!')
      setNotification({
        message: 'invalid username or password',
        error: true
      })
      setTimeout(()=>{
        setNotification(defaultNotification)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        username
        <input type='text' name='username' value={username} onChange={({target})=> setUsername(target.value)}/>
        <br/>
        password
        <input type='text' name='password' value={password} onChange={({target})=>setPassword(target.value)} />
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('goodUser')
    console.log('logged out')
    setNotification({
      message: "Logged out successfully",
      error: false
    })
    setTimeout(() => {
      setNotification(defaultNotification)
    }, 5000);
  }

  const createNewblog = async (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    try{
      const addedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNotification({
        message: `${addedBlog.title} has been successfully added!`,
        error: false
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch(exception){
      setNotification({
        message: "title, author, url are required",
        error: true
      })
      setTimeout(() => {
        setNotification(defaultNotification)
      }, 5000)
    }
    
  }

  const createBlogform = () => (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createNewblog}>
        title:<input type='text' value={title} onChange={({target})=>setTitle(target.value)} />
        <br/>
        author:<input type='text' value={author} onChange={({target})=>setAuthor(target.value)} />
        <br/>
        url:<input type='text' value={url} onChange={({target})=>setUrl(target.value)} />
        <button type='submit'>create</button>
      </form>
    </div>
  )

  if (user===null){
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

      <ul>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </ul>
    </div>
  )
}

export default App;
