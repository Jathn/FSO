import React from 'react'
import Part from './Part.jsx'

const Content = (props) => {

    const content = props.content;

    const part_list = content.map((part, index) => {
        return <Part key={index} name={part.name} exercises={part.exercises}/>
    })
    
    return(
        <>
            {part_list}            
        </>
    );
}

export default Content