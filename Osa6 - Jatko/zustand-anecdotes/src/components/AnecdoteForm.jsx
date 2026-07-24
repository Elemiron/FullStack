import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { appendAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const createAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    fetch('http://localhost:3000/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        votes: 0
      })
    })
      .then(response => response.json())
      .then(data => {
        appendAnecdote(data)
        setNotification(`you created '${data.content}'`)
    })
    
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm