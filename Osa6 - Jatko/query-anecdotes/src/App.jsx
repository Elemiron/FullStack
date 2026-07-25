// Käytetään custom hookia, joka huolehtii
// anekdoottien hausta sekä niiden lisäämisestä ja päivittämisestä
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes' 


const App = () => {
  //const { anecdotes, isPending, addAnecdote, voteAnecdote } = useAnecdotes(),koodi on siirretty useAnecdotes hookiin
  const { anecdotes, isPending, isError, addAnecdote, voteAnecdote } = useAnecdotes() //6.19 tehtävää varten
  
// Välittää äänestyksen custom hookille
const handleVote = (anecdote) => {
  voteAnecdote(anecdote)
}

  if (isPending) {
  return <div>loading data...</div>
}

  //if (result.isError) { Vaihdettu 6.19 tehtävää varten
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      {/* <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} /> */}
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App