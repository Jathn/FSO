import React from 'react'

const Part = (props) => {

    const name = props.name
    const exercises = props.exercises;
    
    return(
        <>
            <p>Name: {name} nr. of exercises: {exercises}</p>           
        </>
    );
}

export default Part