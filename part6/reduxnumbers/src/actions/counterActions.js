const add = (value) => {
    return {
        type: 'INCREMENT',
        value: value
    }
}

const subtract = (value) => {
    return {
        type: 'DECREMENT',
        value: value
    }
}

const multiply = (value) => {
    return {
        type: 'MULTIPLY',
        value: value
    }
}

const divide = (value) => {
    return {
        type: 'DIVIDE',
        value: value
    }
}

export default { add, subtract, multiply, divide }