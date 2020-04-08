import React from 'react'


const Notification = ({newNotification, success}) =>{
    if (newNotification==='')
        return ''
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    
    if (success)
      style.color = 'green'
    return(
        <div style={style}>
            {newNotification}
        </div>
    )
}

export default Notification