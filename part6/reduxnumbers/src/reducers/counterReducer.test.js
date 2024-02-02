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
        const action = { type: 'INCREMENT' }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(1)
    })

    test('DECREMENT', () => {
        const state = 0
        const action = { type: 'DECREMENT' }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(-1)
    })

    test('default', () => {
        const state = 0
        const action = { type: 'UNKNOWN' }
        deepFreeze(state)
        deepFreeze(action)
        expect(counterReducer(state, action)).toBe(0)
    })
})