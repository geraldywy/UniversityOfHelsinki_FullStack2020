import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Button} from '@material-ui/core'

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
        <br></br>
        <Button variant='contained' color='primary' onClick={toggleVisiblity}>Cancel</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button variant='contained' color='primary' id='show' onClick={toggleVisiblity}>{props.buttonLabel}</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
