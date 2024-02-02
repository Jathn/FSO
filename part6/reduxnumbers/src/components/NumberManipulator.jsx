import NumberDisplay from './NumberDisplay'

import { add, subtract, multiply, divide } from '../reducers/counterReducer'
import { useSelector, useDispatch } from 'react-redux'

const NumberManipulator = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state)

    
    return (
        <>
        <NumberDisplay  number={count} />
        <div>
            <button onClick={() => dispatch(add(1))}>Add 1</button>
            <button onClick={() => dispatch(subtract(1))}>Subtract 1</button>
            <button onClick={() => dispatch(multiply(2))}>Multiply by 2</button>
            <button onClick={() => dispatch(divide(2))}>Divide by 2</button>
        </div>
        </>
    )
}

export default NumberManipulator