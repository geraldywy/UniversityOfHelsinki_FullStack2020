import React from 'react'
import {successNotif, clearNotif} from '../reducers/notificationReducer'
import {useDispatch} from 'react-redux'
import {setUser} from '../reducers/userReducer'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const Logout = () => {

    const dispatch = useDispatch()
    let timeoutId

    const handleLogout = () => {
        dispatch(setUser(null))
        window.localStorage.removeItem('goodUser')
        console.log('logged out')
        clearTimeout(timeoutId)
        dispatch(successNotif('Logged out successfully'))
        timeoutId = setTimeout(() => {
          dispatch(clearNotif())
        }, 5000)
      }
    return (
        <Button color='inherit' component={Link} to='/' onClick={handleLogout}>Log out</Button>
    )
}

export default Logout
