import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { updateAnecdote, removeAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    fetch(`http://localhost:3000/anecdotes/${anecdote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAnecdote)
    })
      .then(response => response.json())
      .then(data => {
        updateAnecdote(data)
        setNotification(`you voted for '${data.content}'`)
      })
  }

  const remove = (anecdote) => {
    fetch(`http://localhost:3000/anecdotes/${anecdote.id}`, {
      method: 'DELETE'
    }).then(() => removeAnecdote(anecdote.id))
  }

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>

            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote)}>
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList