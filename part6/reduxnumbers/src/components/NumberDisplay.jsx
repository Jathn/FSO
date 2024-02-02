const NumberDisplay = (props) => {

    return (<div>
                <p>Below is a number, we want to perform operations on it.</p>
                <h2>{props.number}</h2>
                <p>Look for changes in the number, might be exciting!</p>
            </div>
    )
}

export default NumberDisplay