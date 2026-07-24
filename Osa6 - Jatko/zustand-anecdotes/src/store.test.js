import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'

import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions
} from './store'

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [],
    filter: ''
  })
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Test anecdote', votes: 0 }
    ]

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})

describe('useAnecdotes', () => {
  it('returns anecdotes sorted by votes', () => {
    const anecdotes = [
      { id: 1, content: 'One', votes: 1 },
      { id: 2, content: 'Two', votes: 5 },
      { id: 3, content: 'Three', votes: 3 }
    ]

    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([
      anecdotes[1],
      anecdotes[2],
      anecdotes[0]
    ])
  })
})