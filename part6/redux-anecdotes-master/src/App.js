import React, {useEffect} from 'react'
import CreateAnecdote from './components/CreateAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filtering from './components/Filtering'
import {initAnecdote} from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initAnecdote())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Filtering />
      <AnecdoteList />
      <CreateAnecdote />
    </div>
  )
}

export default App