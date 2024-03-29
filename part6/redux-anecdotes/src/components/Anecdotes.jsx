import { notificationTimeout } from '../reducers/notificationReducer'
import { createAnecdote, upVote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

import Notification from '../components/Notification'
import AnecdoteView from '../components/AnecdoteView'
import anecdoteService from '../services/anecdotes.js'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notification)
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => state.filter === '' || anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationTimeout(`You created: ${content}`, 5))
    }
    
    const vote = (anecdote) => {
        dispatch(upVote(anecdote))
    }
    
    return (
        <div>
        <Notification message={message}/>
        <AnecdoteView anecdotes={anecdotes} vote={vote} />
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default Anecdotes
