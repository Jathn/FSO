import { useReducer, useContext, useEffect } from 'react'
import NotificationContext from '../contexts/notificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    console.log("dispatch, should go away in 5 seconds")
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
      console.log("Went away")
    }, 5000)
    return () => clearTimeout(timer)
  }, [notification, dispatch])
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notification === "") {
    return <div />
  }
  return (
    <div style={style}>
      {notification === "" ? null : notification}
    </div>
  )
}

export default Notification
