import React from 'react'
import {connect} from 'react-redux'
import {createVote} from '../reducers/anecdoteReducer'
import {upvoteNotif} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const upvote = ({id, message}) => {
        props.createVote(id)
        props.upvoteNotif(message, 10)
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

    const anecdotes = props.anecdotes
    const filterTag = props.filter.toLowerCase()
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b)=>b.votes-a.votes).filter(anecdote=>anecdote.content.toLowerCase().includes(filterTag)).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={()=>upvote({id:anecdote.id, message:anecdote.content})} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }

const mapDispatchToProps = {
    createVote,
    upvoteNotif
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)