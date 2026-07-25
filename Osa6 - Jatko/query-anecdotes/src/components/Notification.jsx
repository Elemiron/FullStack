import { useContext } from 'react'
import useNotify from '../hooks/useNotify'

const Notification = () => {
  // Haetaan notifikaatio custom hookin kautta.
  const { notification } = useNotify()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  // Jos notifikaatiota ei ole, komponenttia ei näytetä
  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification