import { setFilter } from "../reducers/filterReducer"
import { useDispatch, useSelector } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    
    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }
    
    const style = {
        marginBottom: 10,
    }
    
    return (
        <div style={style}>
        Search quote: <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter