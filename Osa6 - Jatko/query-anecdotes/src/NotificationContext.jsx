import { createContext, useState } from 'react'

// Luodaan sovelluksen yhteinen konteksti notifikaatioiden hallintaa varten
// Context API:n avulla notifikaatioita voidaan käyttää eri komponenteissa
// ilman, että tietoa tarvitsee välittää propseina
const NotificationContext = createContext()

export default NotificationContext

// Provider huolehtii notifikaation tilasta ja tarjoaa sen
// kaikille sen sisällä oleville komponenteille
export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}