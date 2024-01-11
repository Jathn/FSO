function Country(props) {

    const name = props.country ? props.country.name["common"] : null
    const capital = props.country ? props.country["capital"][0] : null
    const area = props.country ? props.country["area"] : null
    const languages = props.country ? Object.values(props.country["languages"]) : null
    const languagesList = props.country ? languages.map(language => { return <li key={language}>{language}</li>}) : null
    const pic_url = props.country ? props.country.flags ? props.country.flags.png : null : null
    
    const show = props.country ? true : false
    return (
        <>  
            { show ? <div className='CountryView'>
                <h2>{name}</h2>
                <p>capital {capital}</p>
                <p>area {area}</p>
                <h6 style={{"fontStyle": "bold", "fontSize": 20}}>Languages</h6>
                <ul>
                    {languagesList}
                </ul>
                <img src={pic_url}></img>
            </div> : <p></p>}
        </>
    )
}

export default Country