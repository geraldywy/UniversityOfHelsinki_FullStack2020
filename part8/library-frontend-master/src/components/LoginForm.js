import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {LOGIN} from '../mutations'

const LoginForm = ({setToken, show, notify, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')  
    const [login, {data}] = useMutation(LOGIN,
        {
            onError: (error)=> {
                notify(error.graphQLErrors[0].message)
            }
        })

    useEffect(()=>{
        if(data){
            const token = data.login.value
            setToken(token)
            localStorage.setItem('token', token)
            setPage("authors")
        }
    }, [data]) //eslint-disable-line

    const handleLogin = async (event) => {
        event.preventDefault()
        await login({
            variables: {
                username,
                password
            }
        })
        
    }
    if (!show){
        return null
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                username: <input type='text' value={username} onChange={({target})=>setUsername(target.value)} />
                <br></br>
                password: <input type='text' value={password} onChange={({target})=>setPassword(target.value)} />
                <br></br>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}


export default LoginForm