import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createVote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const upvote = (id) => {
        console.log('upvote')
        dispatch(createVote(id))
    }

    const Anecdote = ({anecdote, handleClick}) => (
        <div >
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )

    const anecdotes = useSelector(state=>state)
    console.log(anecdotes)
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b)=>b.votes-a.votes).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={()=>upvote(anecdote.id)} />
            )}
        </div>
    )
}

export default AnecdoteList