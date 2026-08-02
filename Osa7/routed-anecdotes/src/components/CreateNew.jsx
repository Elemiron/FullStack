import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  // Tehtävä 7.1:
  // Lomakkeen kenttien tila hallitaan useField-custom hookilla.
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

// Tehtävä 7.6:
// Haetaan uuden anekdootin lisäysfunktio suoraan custom hookista.
  const { addAnecdote } = useAnecdotes()

  const navigate = useNavigate()
  

  // Luo uuden anekdootin lomakkeen arvoista
  // ja siirtyy takaisin etusivulle.
  const handleSubmit = (e) => {
    e.preventDefault()

    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    navigate('/')
  }

  // Tehtävä 7.2:
  // Tyhjentää kaikki lomakekentät.
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
  <div>
    <h2>create a new anecdote</h2>
    <form onSubmit={handleSubmit}>
      <div>
        content
        <input
          name='content'
          value={content.value}
          onChange={content.onChange}
        />
      </div>
      <div>
        author
        <input
          name='author' 
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        url for more info
        <input
          name='info'
          value={info.value}
          onChange={info.onChange}
        />
      </div>
      <button>create</button>
      <button type='button' onClick={handleReset}>
        reset
      </button>
    </form>
  </div>
)
}

export default CreateNew