const Total = (props) => {

    var total = 0;
    
    props.content.forEach(part => total += part.exercises)
    
    return(
        <>
            <p style={{fontWeight: "bold"}}>Total number of exercises: {total}</p>            
        </>
    );
}

export default Total