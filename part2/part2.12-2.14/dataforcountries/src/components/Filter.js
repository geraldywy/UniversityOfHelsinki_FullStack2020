import React from 'react'

const Filter = ({newFilter, handleNewFilter}) =>{
    return(
        <div>
            <p>find countries: <input onChange={handleNewFilter} value={newFilter} /></p>
        </div>
    )
}

export default Filter