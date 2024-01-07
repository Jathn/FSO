import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [anecdotesWithVotes, setAnecdotesWithVotes] = useState(
    anecdotes.map((anecdoteText) => ({ text: anecdoteText, votes: 0, voted: false }))
  );

  const [selected, setSelected] = useState(0);

  const nextQuote = () => {
    let next;
    do {
      next = Math.floor(Math.random() * anecdotes.length);
    } while (next === selected);

    setSelected(next);
  };

  const upVoteOne = (index) => {
    const updated = [...anecdotesWithVotes];

    if (!anecdotesWithVotes[index].voted) {
      updated[index].votes = anecdotesWithVotes[index].votes + 1;
      updated[index].voted = true;
    }

    setAnecdotesWithVotes(updated);
  };

  const highestVoted = anecdotesWithVotes.findIndex((anecdote) => anecdote === [...anecdotesWithVotes].sort((a, b) => a.voted - b.voted)[7])

  return (
    <div>
      <h2>Current Anecdote</h2>
      <p>{anecdotesWithVotes[selected].text}</p>
      <p>Votes: {anecdotesWithVotes[selected].votes}</p>
      <button onClick={() => upVoteOne(selected)}>Vote</button>
      <button onClick={nextQuote}>Next Anecdote</button>

      <h2>Highest Voted Anecdote</h2>
      <p>{anecdotesWithVotes[highestVoted].text}</p>
      <p>Votes: {anecdotesWithVotes[highestVoted].votes}</p>
    </div>
  );
};

export default App;