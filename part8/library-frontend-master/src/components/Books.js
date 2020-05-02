import React from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS_NO_GENRE} from '../queries'

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS_NO_GENRE)

  if (!props.show) {
    return null
  }
  if (loading){
    return <p>loading...</p>
  }
  if (error)
    return <p>Books page error</p>
  
  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books