const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

//6.17 tehtävää varte
export const createAnecdote = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnecdote),
  })

   // Tehtävä 6.21, Jos palvelin palauttaa virheen, välitetään se React Queryn onError-käsittelijälle,
  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return await response.json()
}

//6.18 tehtävää varten
export const updateAnecdote = async (updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAnecdote),
  })

  return await response.json()
}

