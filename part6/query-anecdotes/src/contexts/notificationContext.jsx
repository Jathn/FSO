import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
        return action.data
        case "CLEAR_NOTIFICATION":
        return ""
        default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, "")

    return(
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext