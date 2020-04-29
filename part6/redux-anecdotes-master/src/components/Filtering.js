import React from 'react'
import {connect} from 'react-redux'
import {createFilter} from '../reducers/filterReducer'

const Filtering = (props) => {

    const updateFilter = ({target}) => {
        props.createFilter(target.value)
    }
    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
            filter <input input='text' onChange={updateFilter} />
        </div>
    )
}

export default connect(null, {createFilter})(Filtering)