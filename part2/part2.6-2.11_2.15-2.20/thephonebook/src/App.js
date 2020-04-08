import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newNotification, setNewNotification ] = useState('')
  const [ newSuccess, setNewSuccess ] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(response => setPersons(response))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const personsToShow = newFilter ? persons.filter(person=>person.name.toLowerCase().includes(newFilter)) : persons
  
  const handleUpdate = ({person_to_replace}) =>{
    personsService
    .update({person:person_to_replace})
    .then(
      response=>setPersons(persons.map(person=>person.name===person_to_replace.name ? person_to_replace: person))
    ).catch(
      error=>{
        console.log('error')
        handleNotification({Notification:`${person_to_replace} does not exist anymore in the phonebook`, success:false})
      }
    )
  }
  
  const handleSubmit = (event)=>{
    event.preventDefault()
    const person_to_replace = persons.find((person)=>person.name===newName)
    
    console.log(person_to_replace)
    if (typeof person_to_replace !== 'undefined' && person_to_replace.number!==newNumber){
      if (window.confirm(`${person_to_replace.name} is already added to phonebook, replace the old number with a new one?`)) { 
        person_to_replace.number=newNumber
        console.log(person_to_replace)
        handleUpdate({person_to_replace})
        handleNotification({Notification:`Updated ${person_to_replace.name}'s number`, success:true})
      }
    }
    else if (persons.map((person)=>person.number).includes(newNumber)){
      const person_using_number = persons.find((person)=>person.number===newNumber)
      handleNotification({Notification:`The number: ${newNumber} is already registered under ${person_using_number.name}`, success:false})
    }
    else{
      personsService
      .addNew({name:newName, number:newNumber})
      .then(response=>{
        setPersons(persons.concat(response))
      }
      )
      handleNotification({Notification:`Added ${newName} successfully`, success:true})
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = ({id ,name , number}) =>{
    if (window.confirm(`Delete ${name}?`)) { 
      personsService
      .deleteEntry(id).catch(
        error=>{
          console.log('error')
          handleNotification({Notification:`${name} does not exist anymore in the phonebook`, success:false})
        }
      )
      setPersons(persons.filter(person=>(person.name!==name && person.number!==number)))
      console.log('deleted', name)
      handleNotification({Notification:`Deleted ${name} successfully`, success:true})
    }
  }

  const handleNotification = ({Notification, success}) =>{
      setNewNotification(Notification)
      setNewSuccess(success)
      setTimeout(() => {
        setNewNotification('')
        setNewSuccess(null)
      }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification newNotification={newNotification} success={newSuccess}/>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} 
      handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App