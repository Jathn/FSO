import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote: (state, action) => {
            state.push(action.payload)
        },
        voteUpAnecdote: (state, action) => {
            const id = action.payload.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        },
        appendAnecdote: (state, action) => {
            state.push(action.payload)
        },
        setAnecdotes: (state, action) => {
            return action.payload
        }
    }    
})

export const { createAnecdote, voteUpAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer