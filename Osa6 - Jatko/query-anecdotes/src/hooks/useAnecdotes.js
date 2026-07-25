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
// Hakee anekdootit palvelimelta
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  // Lisää uuden anekdootin palvelimelle
  // Onnistuneen lisäyksen jälkeen päivittää anekdoottilistan automaattisesti
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  // Päivittää anekdootin (äänestys).
  // Päivityksen jälkeen hakee uusimman listan palvelimelta
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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