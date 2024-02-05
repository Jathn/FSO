const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const createAnecdote = (content) => {
    return {
        type: 'NEW_ANECDOTE',
        data: {
            content,
            votes: 0,
            id: (100000 * Math.random()).toFixed(0)
        }
    }
}

export const voteUpAnecdote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes,
    }
}

export default anecdoteReducer