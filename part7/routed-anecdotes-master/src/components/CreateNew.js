import React from 'react'
import {useHistory} from 'react-router-dom'
import {useField} from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
  
      props.updateNotif(`A new anecdote "${content.value}" created!`)
      
      history.push('/anecdotes')
    }

    const handleReset = (e)=>{
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} reset='none' name='content'/>
          </div>
          <div>
            author
            <input {...author } reset='none' name='author'/>
          </div>
          <div>
            url for more info
            <input {...info } reset='none' name='info' />
          </div>
          <button type='submit'>create</button>
          <button onClick={handleReset}> reset </button>
        </form>
      </div>
    )
  
  }

export default CreateNew