import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button id='show' onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
