import useCounterStore from '../store'

const Buttons = () => {
  const good = useCounterStore(state => state.actions.good)
  const neutral = useCounterStore(state => state.actions.neutral)
  const bad = useCounterStore(state => state.actions.bad)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
    </div>
  )
}

export default Buttons
