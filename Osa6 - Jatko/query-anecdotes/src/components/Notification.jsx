import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  // Haetaan nykyinen notifikaatio Context API:n kautta
  const { notification } = useContext(NotificationContext)

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