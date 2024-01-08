import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import PhoneBook from './components/PhoneBook'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [viewedPersons, setViewedPersons] = useState([])

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setViewedPersons(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const onFilterChange = (value) => {
    if (!value == '') {
      const newPersons = [...persons].filter(person => person.name.toLowerCase().includes(value.toLowerCase(), 0))
      setViewedPersons(newPersons)
    }
  }

  const addPerson = (value) => {
    const newPersons = [...viewedPersons]
    newPersons.push(value)
    console.log(newPersons)
    setPersons(newPersons)
  }

  return (
    <>
      <div>
        <Header title={"Phonebook"}/>
        <PhoneBook persons={viewedPersons} onFilterChange={onFilterChange} addPerson={addPerson} />
      </div>
    </>
  )
}

export default App
