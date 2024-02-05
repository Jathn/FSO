import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote: (state, action) => {
            return [...state, {content: action.payload, votes: 0, id: (100000 * Math.random()).toFixed(0)}]
        },
        voteUpAnecdote: (state, action) => {
            const id = action.payload
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        },
        initializeAnecdotes: (state, action) => {
            return action.payload
        }
    }    
})

export const { createAnecdote, voteUpAnecdote, initializeAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer