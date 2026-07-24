import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import {
  cleanup,
  render,
  screen
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import AnecdoteList from './AnecdoteList'
import useAnecdoteStore from '../store'

afterEach(() => {
  cleanup()
})

describe('AnecdoteList', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'React is easy', votes: 3 },
        { id: 2, content: 'Zustand is simple', votes: 5 },
        { id: 3, content: 'Redux is powerful', votes: 1 }
      ],
      filter: 'react'
    })
  })

  it('shows only anecdotes matching the filter', () => {
    render(<AnecdoteList />)

    expect(screen.getByText('React is easy')).toBeDefined()
    expect(screen.queryByText('Zustand is simple')).toBeNull()
    expect(screen.queryByText('Redux is powerful')).toBeNull()
  })

  it('increments anecdote votes when vote button is clicked', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({
        id: 1,
        content: 'React is easy',
        votes: 4
      })
    })

    const user = userEvent.setup()

    render(<AnecdoteList />)

    const voteButton = screen.getByRole('button', { name: 'vote' })

    await user.click(voteButton)

    expect(screen.getByText('has 4')).toBeDefined()
  })
})