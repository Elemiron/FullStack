// Lomake uuden anekdootin luomiseen.
// Varsinainen tallennus tehdään custom hookin kautta

//const AnecdoteForm = ({ newAnecdoteMutation }) => { Muuttunut 6.19 tehtävää varten
const AnecdoteForm = ({ addAnecdote }) => {
  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.reset()

    //newAnecdoteMutation.mutate({
    //  content,
    //  votes: 0,
    //})
  //addAnecdote(content) Muuttunut 6.19 tehtävää varten, lisää palvelimelle uuden anekdootin

    addAnecdote(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm