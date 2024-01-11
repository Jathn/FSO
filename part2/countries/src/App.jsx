import { useState, useEffect } from 'react'

import { getAll } from './utils/countries'

import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([{name: {common: "AnyCountry1"}, capital: ["Capital"], area: "1", languages: {"ding": "dong"}}])
  const [countryNames, setCountryNames] = useState(["AnyCountry1", "AnyCountry2"])
  const [filter, setFilter] = useState("")
  const [current, setCurrent] = useState(null)

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const updateCountry = () => {
    if (countries.length === 1) {
      setCurrent(countries[0])
    } else {
      setCurrent(null)
    }
  }
  
  const updateCountries = () => {
    getAll().then(response => {
      const potentialList = response.data

      const filteredList = potentialList.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      console.log(filteredList)
      setCountries(filteredList)
      setCountryNames(filteredList.map(country => country.name.common))
    })
  }

  useEffect(() => {
    updateCountry()
  }, [countries])

  useEffect(() => {
    updateCountries()
  }, [filter])



  return (
    <>
      <form>
        <p>Find Countries: </p><input onChange={onFilterChange} value={filter} />
      </form>
      {countryNames.length < 10 ? countryNames.map(name => <><p key={countryNames.indexOf(name)}>{name}<button onClick={() => setFilter(name)}>show</button></p></>) : <p>Too many matches, specify a filter by typing the name</p>}
      <Country country={current} />
    </>
  )
}

export default App
