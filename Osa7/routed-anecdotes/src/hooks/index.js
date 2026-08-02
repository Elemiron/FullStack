import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

// Tehtävä 7.1:
// Custom hook yhden lomakekentän tilan hallintaan.
// Hook palauttaa kentän tyypin, arvon ja onChange-käsittelijän,
// jolloin samaa logiikkaa voidaan käyttää uudelleen useissa lomakekentissä.
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Tyhjentää lomakekentän arvon.
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

// Tehtävä 7.4:
// Custom hook hakee kaikki anekdootit palvelimelta
// ja palauttaa ne komponenttien käyttöön.
export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  // Hakee anekdootit palvelimelta,
  // kun hook otetaan ensimmäisen kerran käyttöön
  useEffect(() => {
    anecdoteService.getAll().then((data) => {
      setAnecdotes(data)
    })
  }, [])

  // Tehtävä 7.5:
  // Lisää uuden anekdootin palvelimelle
  // ja päivittää paikallisen tilan
  const addAnecdote = async (anecdote) => {
    const createdAnecdote = await anecdoteService.createNew(anecdote)

    setAnecdotes(anecdotes.concat(createdAnecdote))
  }

  // Tehtävä 7.6:
  // Poistaa anekdootin palvelimelta
  // ja päivittää paikallisen tilan
  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteAnecdote(id)

    setAnecdotes(
      anecdotes.filter((anecdote) => anecdote.id !== id)
    )
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  }
}

export const useAnotherHook = () => {
  // ...
}