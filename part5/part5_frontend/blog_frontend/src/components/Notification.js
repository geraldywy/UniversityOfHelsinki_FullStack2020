import React from 'react'

let status = null

const Notification = ({ notifObj }) => {
  if (notifObj.message !== null) {
    if (notifObj.error) {
      status = 'error'
    } else {
      status = 'success'
    }
    return <div id='notif' className={`${status}Notification`}>{notifObj.message}</div>
  }
  return null
}

export default Notification
