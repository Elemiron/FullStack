import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

// Tehtävä 6.19:
// Siirretty React Queryyn liittyvä logiikka omaan custom hookiin,
// jotta App.jsx pysyy selkeämpänä ja tietojen haku sekä mutaatiot
// voidaan keskittää yhteen paikkaan
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from '../requests'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

// Hakee anekdootit palvelimelta
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })


// Lisää uuden anekdootin palvelimelle
// Onnistuneen lisäyksen jälkeen päivittää anekdoottilistan automaattisesti
// ja näyttää käyttäjälle notifikaation
const newAnecdoteMutation = useMutation({
  mutationFn: createAnecdote,
  onSuccess: (newAnecdote) => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    // Näytetään ilmoitus onnistuneesta lisäyksestä.
    setNotification(`Anecdote '${newAnecdote.content}' created`)

    // Poistetaan ilmoitus 5 sekunnin kuluttua.
    setTimeout(() => {
      setNotification('')
    }, 5000)
  },
})

// Päivittää anekdootin (äänestys)
// Päivityksen jälkeen hakee uusimman listan palvelimelta
// ja näyttää käyttäjälle notifikaation
const updateAnecdoteMutation = useMutation({
  mutationFn: updateAnecdote,
  onSuccess: (updatedAnecdote) => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    // Näytetään ilmoitus onnistuneesta äänestyksestä
    setNotification(`You voted '${updatedAnecdote.content}'`)

    // Poistetaan ilmoitus 5 sekunnin kuluttua
    setTimeout(() => {
      setNotification('')
    }, 5000)
  },
})

  // Hook palauttaa sovelluksen tarvitsemat tiedot ja toiminnot,
  // jotta komponentit eivät käsittele React Queryn yksityiskohtia
    return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError, //6.19 tehtävää varten 
    addAnecdote: (content) =>
      newAnecdoteMutation.mutate({
        content,
        votes: 0,
      }),
    voteAnecdote: (anecdote) =>
      updateAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  }
}