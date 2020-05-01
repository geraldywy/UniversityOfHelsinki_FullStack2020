import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

import {
    Button,
    AppBar,
    Toolbar
  } from '@material-ui/core'

const MenuBar = () => {
    const user = useSelector(state=>state.user)
    return(
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={Link} to='/users'>
                    Users
                </Button>
                {user 
                    ? <Logout />
                    : <Button color='inherit' component={Link} to='/login'>
                        Login
                      </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default MenuBar