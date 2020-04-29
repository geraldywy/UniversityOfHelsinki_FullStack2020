import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNew = async (content) => {

    const anecdote = {
        content,
        votes: 0
    }

    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const upvote = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToUpvote = anecdotes.find(anecdote=>anecdote.id===id)
    const upVotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes+1
    }
    const response = await axios.put(`${baseUrl}/${id}`, upVotedAnecdote)
    return response.data
}

export default {getAll, addNew, upvote}