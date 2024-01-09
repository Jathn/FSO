import { useState, useEffect } from 'react'
import axios from 'axios'
import { create, remove, getAll } from '../utils/crud'

const PhoneBook = (props) => {
    const persons = props.persons
    const [newPerson, setNewPerson] = useState({name: '', number: '', id: -1})
    const onFilterChange = (event) => {
        props.onFilterChange(event.target.value)
    }

    useEffect(() => {
        const eventHandler = () => {
            getAll()
                .then(data => {
                    const id = data.length + 1;
                    setNewPerson(prevPerson => ({ name: prevPerson.name, number: prevPerson.number, id: id }));
                })
        };
        eventHandler();
    }, [persons])

    const handleNameChange = (event) => {
        setNewPerson({...newPerson, name: event.target.value})
    } 
    const handleNumberChange = (event) => {
        setNewPerson({...newPerson, number: event.target.value.toString()})
    }

    const addNewPerson = () => {
        console.log("Adding ", newPerson.name, newPerson.id)
        create(newPerson).then((response) => console.log(`Status for adding , ${newPerson.name} (id: ${newPerson.id}) was ${response.status}`))
    }

    const deletePerson = (event) => {
        if (window.confirm("Do you really want to delete this person?")) {
            console.log(`deleting id: ${event.target.value}`)
            remove(event.target.value)
        }
    }

    const personsList = persons.map(person => {return (<li key={person.id}>name: {person.name} number: {person.number} <button onClick={deletePerson} value={person.id}>remove</button></li>)})

    return (
      <>
        <h2>Filter</h2>
        <form><label>Filter shown with: </label><input placeholder='this phrase' onChange={onFilterChange}></input></form>
        <h2>Add person:</h2>
        <form>
            <label>Name: </label><input placeholder="john doe" onChange={handleNameChange} value={newPerson.name}></input> <br />
            <label>Number: </label><input placeholder="+49 123 456 7890" onChange={handleNumberChange} value={newPerson.number}></input><br />
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