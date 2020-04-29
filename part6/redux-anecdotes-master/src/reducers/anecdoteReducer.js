import anecdoteService from '../services/anecdotes'

export const createAnecdote = (anecdote) => {

  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addNew(anecdote)
    dispatch({
        type: 'create',
        anecdote: newAnecdote
      }
    )}
}
export const createVote = (id) => {
  
  return async (dispatch) => {
    const upvotedAnecdote = await anecdoteService.upvote(id)
    dispatch({
      type: 'vote',
      id,
      upvotedAnecdote
    })
  }
}

export const initAnecdote = ()=>{
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}


const noteReducer = (state = [], action) => {
  switch(action.type){
    case 'vote':{
      return state.map(a=>a.id===action.id ? action.upvotedAnecdote: a)
    }

    case 'create':{
      return [...state, action.anecdote]
    }

    case 'INIT': {
      return action.anecdotes
    }

    default: return state
  }
}

export default noteReducer