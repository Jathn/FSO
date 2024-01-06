import React from 'react'

const Total = (props) => {

    var total = 0;
    
    props.content.forEach(part => total += part.exercises)
    
    return(
        <>
            <p>Total number of exercises: {total}</p>            
        </>
    );
}

export default Total