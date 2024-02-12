const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        data: notification
    }
}

const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: ''
    }
}

export const notificationTimeout = (notification, time) => {
    return async dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationReducer