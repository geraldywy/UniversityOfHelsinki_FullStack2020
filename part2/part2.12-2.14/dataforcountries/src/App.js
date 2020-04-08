import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'

function App() {
  const [ newFilter, setNewFilter ] = useState('')
  const [ newDisplay, setNewDisplay ] = useState([])
  
  
  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response=>{
      setNewDisplay(response.data)
    })
  }, [])

  

  

  const handleNewFilter = (event) => {
    return (
      setNewFilter(event.target.value)
    )
  }
  

  return (
    <div>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <Display countries={newDisplay}  newFilter={newFilter} setNewFilter={setNewFilter} />
    </div>
      
  )
}

export default App
