import { useState } from 'react'
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


// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}