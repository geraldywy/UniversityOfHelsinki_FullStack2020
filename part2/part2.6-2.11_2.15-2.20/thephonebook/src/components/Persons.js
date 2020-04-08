import React from 'react'

const Persons = ({personsToShow, handleDelete})=>{
    return (
        <div>
            {personsToShow.map((person, i) =>  
            <p key={i}> 
            {person.name} {person.number}  <button onClick={()=>handleDelete({id:person.id, name:person.name, number:person.number })}> delete </button>
            </p>
            )
            }
        </div>
    )
    
}

export default Persons