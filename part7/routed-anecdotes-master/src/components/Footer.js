import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => (
    <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
  
      See <Link to='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</Link> for the source code.
    </div>
  )

export default Footer