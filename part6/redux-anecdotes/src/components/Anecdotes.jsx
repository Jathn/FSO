import { createAnecdote, voteUpAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

import AnecdoteView from '../components/AnecdoteView'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }
    
    const vote = (anecdote) => {
        dispatch(voteUpAnecdote(anecdote))
    }
    
    return (
        <div>
        <AnecdoteView anecdotes={anecdotes} vote={vote} />
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default Anecdotes
