import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './App.css'
import './index.css'

import blogService from './services/blogs'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import MenuBar from './components/MenuBar'

import {initBlogs} from './reducers/blogReducer'
import {setUser} from './reducers/userReducer'
import {initUsers} from './reducers/usersReducer'

import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import {
  Container
} from '@material-ui/core'

function App() {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notif)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    console.log('checking local window storage')
    const loggedUserJSON = window.localStorage.getItem('goodUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const matchUserId = useRouteMatch('/users/:id')
  const userInfo = matchUserId
    ? users.find(user=>user.id===matchUserId.params.id.toString())
    : null

  const matchBlogId = useRouteMatch('/blogs/:id')
  const blog = matchBlogId
    ? blogs.find(blog=>blog.id===matchBlogId.params.id.toString())
    : null

  return (
    <Container>
      <MenuBar />
      <Notification notifObj={notification} />
      {
        user===null 
        ? null
        : (
        <div>
            <h2>Welcome {user.name}</h2>
            
            <Togglable buttonLabel="Add a new blog">
            <BlogForm/>
            </Togglable>
        </div>
        )
      }
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={blog} single={true} />
        </Route>
        <Route path='/users/:id'>
          <UserInfo userInfo = {userInfo} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/'>
          <div>
            <Blogs blogs={blogs} />
          </div>
        </Route>
      </Switch>
    </Container>
  )
}

export default App
