import { useState, useEffect } from 'react'
import { getAll } from './utils/crud'
import Header from './components/Header'
import PhoneBook from './components/PhoneBook'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [viewedPersons, setViewedPersons] = useState([])

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = data => {
      console.log('promise fulfilled')
      setPersons(data)
      setViewedPersons(data)
    }
  
    getAll()
      .then(eventHandler)
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
    setViewedPersons(newPersons)
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
