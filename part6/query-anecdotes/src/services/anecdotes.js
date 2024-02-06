import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const voteAnecdote = async (content) => {
    const response = await axios.get(`${baseUrl}/${content.id}`)
    const anecdote = response.data
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response2 = await axios.put(`${baseUrl}/${content.id}`, updatedAnecdote)
    return response2.data
}