import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'
// Tehtävä 7.1
// Custom hook yhden lomakekentän tilan hallintaan
// Hook palauttaa kentän tyypin, arvon ja onChange-käsittelijän
// jolloin samaa logiikkaa voidaan käyttää uudelleen useissa lomakekentissä
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Tyhjentää lomakekentän arvon
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// Tehtävä 7.4:
// Custom hook hakee kaikki anekdootit palvelimelta
// ja palauttaa ne komponenttien käyttöön
export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => {
      setAnecdotes(data)
    })
  }, [])

  return {
    anecdotes,
  }
}


// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}