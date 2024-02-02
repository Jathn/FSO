import StatViewer from "../components/StatViewer"

import { useSelector, useDispatch } from "react-redux"
import { incrementGood, incrementOk, incrementBad, reset } from "../reducers/countReducer"

const Stats = () => {
    const good = useSelector(state => state.good)
    const ok = useSelector(state => state.ok)
    const bad = useSelector(state => state.bad)
    const dispatch = useDispatch()
    
    return (
        <div>
            <h2>Give Feedback</h2>
            <button onClick={() => dispatch(incrementGood())}>Good</button>
            <button onClick={() => dispatch(incrementOk())}>Ok</button>
            <button onClick={() => dispatch(incrementBad())}>Bad</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <StatViewer good={good} ok={ok} bad={bad} />
        </div>
    )
}

export default Stats
