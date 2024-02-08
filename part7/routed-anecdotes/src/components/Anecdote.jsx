import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes, vote }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))

    if(!anecdote) {
        return <div>Error 404: no anecdote with that id found.</div>
    }

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>has {anecdote.votes} votes</div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
    )
}

export default Anecdote