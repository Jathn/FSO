import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, voteAnecdote } from "./services/anecdotes"

import AnecdoteForm from './components/AnecdoteForm'

import NotificationContext, { NotificationContextProvider } from './contexts/notificationContext'
import VoteButton from './components/VoteButton'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const voteNoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  const handleVote = (anecdote) => {
    voteNoteMutation.mutate(anecdote)
  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContextProvider > 
        <Notification />
        <AnecdoteForm />
    
      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <VoteButton anecdote={anecdote} voteFunction={handleVote}/>
          </div>
        </div>
      )}

  </NotificationContextProvider >
    </div>
  )
}

export default App
