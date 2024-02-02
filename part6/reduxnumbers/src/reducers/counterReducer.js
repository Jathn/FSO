const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.value
        case 'DECREMENT':
            return state - action.value
        case 'MULTIPLY':
            return state * action.value
        case 'DIVIDE':
            return state / action.value
        case 'RESET':
            return 0
        default:
            return state
    }
}

export const add = (value) => {
    return {
        type: 'INCREMENT',
        value: value
    }
}

export const subtract = (value) => {
    return {
        type: 'DECREMENT',
        value: value
    }
}

export const multiply = (value) => {
    return {
        type: 'MULTIPLY',
        value: value
    }
}

export const divide = (value) => {
    return {
        type: 'DIVIDE',
        value: value
    }
}

export default counterReducer