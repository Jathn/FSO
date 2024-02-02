import Anecdote from "../components/Anecdote"

const AnecdoteView = ({anecdotes, vote}) => {
    return (
        <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote =>
            <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id}/>)}
        </ul>
        </div>
    )
}

export default AnecdoteView