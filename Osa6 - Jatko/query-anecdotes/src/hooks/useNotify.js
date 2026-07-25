import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

// Custom hook kapseloi NotificationContextin käytön.
// Komponenttien ei tarvitse kutsua useContextia suoraan,
// vaan ne käyttävät tätä hookia
const useNotify = () => {
  return useContext(NotificationContext)
}

export default useNotify