import React from 'react'

const Header = (props) => {

    const header = props.header;
    
    return(
        <>
            <h1>{header}</h1>            
        </>
    );
}

export default Header