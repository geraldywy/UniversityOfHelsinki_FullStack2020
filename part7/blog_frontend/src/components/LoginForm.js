import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../reducers/userReducer'
import {successNotif, clearNotif, errorNotif} from '../reducers/notificationReducer'
import {setUsername} from '../reducers/usernameReducer'
import {setPassword} from '../reducers/passwordReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useHistory } from 'react-router-dom'

import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () =>{
    let timeoutId
    const dispatch = useDispatch()
    const username = useSelector(state=>state.username)
    const password = useSelector(state=>state.password)
    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in', username, password)
        try {
            const user = await loginService.login({ username, password })
            console.log('successful login, welcome', user.name)

            window.localStorage.setItem('goodUser', JSON.stringify(user))
            dispatch(setUser(user))
            clearTimeout(timeoutId)
            dispatch(successNotif(`Welcome ${user.name}`))
            timeoutId = setTimeout(() => {
            dispatch(clearNotif())
            }, 5000)
            
            dispatch(setUsername(''))
            dispatch(setPassword(''))
            blogService.setToken(user.token)
            history.push('/')
        } catch (exception) {
            console.log('invalid credentials!')
            clearTimeout(timeoutId)
            dispatch(errorNotif('invalid username or password'))
            timeoutId = setTimeout(() => {
            dispatch(clearNotif())
            }, 5000)
        }
    }
    return (
    <div>
      <h2 id="loginDisplay" >Login</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label='username'
          id='usernameField'
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => {dispatch(setUsername(target.value))}}
        />
        <br />
        
        <TextField
          label='password'
          id='passwordField'
          type="text"
          name="password"
          value={password}
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
        <br />
        <br></br>
        <Button variant='contained' color='primary' id='loginButton' type="submit">Login</Button>
      </form>
    </div>
  )}

export default LoginForm