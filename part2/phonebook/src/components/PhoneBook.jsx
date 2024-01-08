import { useState } from 'react'
import axios from 'axios'
const PhoneBook = (props) => {
    const persons = props.persons
    const [newPerson, setNewPerson] = useState({name: '', number: '', id: persons.length + 1})
    
    const onFilterChange = (event) => {
        props.onFilterChange(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewPerson({...newPerson, name: event.target.value})
    } 
    const handleNumberChange = (event) => {
        setNewPerson({...newPerson, number: event.target.value.toString()})
    }

    const addNewPerson = async () => {
        event.preventDefault()
        props.addPerson(newPerson)
        setNewPerson({ name: '', number: '', id: persons.length + 1})
    }

    const personsList = persons.map(person => {return (<li key={person.id}>name: {person.name} number: {person.number} </li>)})

    return (
      <>
        <h2>Filter</h2>
        <form><label>Filter shown with: </label><input placeholder='this phrase' onChange={onFilterChange}></input></form>
        <h2>Add person:</h2>
        <form>
            <label>Name: </label><input placeholder="john doe" onChange={handleNameChange}></input> <br />
            <label>Number: </label><input placeholder="+49 123 456 7890" onChange={handleNumberChange}></input><br />
            <button onClick={addNewPerson}>submit</button>
        </form>
        <h2>People & Numbers:</h2>
        <ul>
            {personsList}
        </ul>
      </>
    )
  }
  
  export default PhoneBook