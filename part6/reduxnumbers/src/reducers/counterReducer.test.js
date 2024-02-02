import counterReducer from './counterReducer'
import deepFreeze from 'deep-freeze'

describe('basic maths', () => {
    test('1 + 1 = 2', () => {
        expect(1 + 1).toBe(2)
    })

    test('1+ \'1\' = 11', () => {
        expect(1 + '1').toBe('11')
    })
})

describe('counterReducer', () => {
    test('INCREMENT', () => {
        const state = 0
        const action = { type: 'INCREMENT', value: 1 }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(1)
    })

    test('DECREMENT', () => {
        const state = 0
        const action = { type: 'DECREMENT', value: 1 }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(-1)
    })

    test('MULTIPLY', () => {
        const state = 1
        const action = { type: 'MULTIPLY', value: 2 }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(2)
    })

    test('DIVIDE', () => {
        const state = 2
        const action = { type: 'DIVIDE', value: 2 }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(1)
    })

    test('RESET', () => {
        const state = 2
        const action = { type: 'RESET' }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(0)
    })

    test('default', () => {
        const state = 0
        const action = { type: 'UNKNOWN' }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(0)
    })
})