import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import { useAnecdotes } from './hooks'

const App = () => {
  // Tehtävä 7.5:
  // Haetaan sekä anekdootit että lisäysfunktio custom hookista
  const { anecdotes, addAnecdote } = useAnecdotes()

  return ( //Muokattu itselleen selkeämmäksi
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route
            path="/create"
            element={<CreateNew addAnecdote={addAnecdote} />}
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App