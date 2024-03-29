const Anecdote = ({ anecdote, vote }) => {
    return (
        <li key={anecdote.id}>
            <p>{anecdote.content} Votes: {anecdote.votes}</p>
            <button onClick={() => vote(anecdote)}>vote</button>
        </li>
    )
}

export default Anecdote