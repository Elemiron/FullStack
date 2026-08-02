import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  // Tehtävä 7.6:
  // Haetaan anekdootit ja poistofunktio suoraan custom hookista.
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  return (
    <div>
      <h2>Anecdotes</h2>

      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}{' '}
            <button onClick={() => deleteAnecdote(anecdote.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList