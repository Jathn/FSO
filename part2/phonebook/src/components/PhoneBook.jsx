import { useState, useEffect } from 'react'
import { create, remove, getAll, update } from '../utils/crud'

import Notice from './Notice'

const PhoneBook = (props) => {
    const persons = props.persons
    const [newPerson, setNewPerson] = useState({name: '', number: ''})
    const [addMessage, setAddMessage] = useState(`Added ${newPerson.name}`)
    const [viewNotice, setViewNotice] = useState(false)

    const noticeComponent = <Notice message={addMessage} />

    const onFilterChange = (event) => {
        props.onFilterChange(event.target.value)
    }

    useEffect(() => {
        const eventHandler = () => {
            getAll()
                .then(data => {
                    setNewPerson(prevPerson => ({ name: prevPerson.name, number: prevPerson.number}));
                })
        };
        eventHandler();
    }, [persons])
    
    useEffect(() => {
        setAddMessage(`Added ${newPerson.name}`)
    }, [newPerson])

    const handleNameChange = (event) => {
        setNewPerson({...newPerson, name: event.target.value})
    } 
    const handleNumberChange = (event) => {
        setNewPerson({...newPerson, number: event.target.value.toString()})
    }

    const addNewPerson = (event) => {
        event.preventDefault()
        props.addPerson(newPerson)
        const currentValue = persons.find(person => person.name === newPerson.name);

        if (!currentValue) {
            console.log("Adding ", newPerson.name, newPerson.id)
            setViewNotice(true)
            setTimeout(() => setViewNotice(false), 3000)
            create(newPerson).then((response) => console.log(`Status for adding , ${newPerson.name} (id: ${newPerson.id}) was ${response.status}`))
        } else {
            if (window.confirm(`${currentValue.name} already exists, update number to: ${newPerson.number} ?`)) {
                const updatedPerson = { ...currentValue, number: newPerson.number };
                update(currentValue.id, updatedPerson)
            }
        }
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
        {viewNotice ? noticeComponent : null}
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