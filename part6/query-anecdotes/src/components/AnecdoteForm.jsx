import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { createAnecdote } from "../services/anecdotes"

import NotificationContext from '../contexts/notificationContext'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdote = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdote.mutate(content)
    dispatch({ type: 'SET_NOTIFICATION', data: `New anecdote created: ${content}` })
  }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
