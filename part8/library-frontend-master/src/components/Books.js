import React, { useState, useEffect } from 'react'
import {useQuery, useLazyQuery} from '@apollo/client'
import {ALL_BOOKS, ALL_BOOKS_BY_GENRE} from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const [getBooksByGenre, {loading, error, data}] = useLazyQuery(ALL_BOOKS_BY_GENRE)


  useEffect(()=>{
    if (data){
      setBooks(data.allBooks)
    }
    else{
      setBooks(props.books)
    }
  }, [data, props.books])

  if (!props.show) {
    return null
  }
  if (loading){
    return <p>loading...</p>
  }
  if (error)
    return <p>Books page error</p>
  

  
  const uniqueGenresSet = new Set(props.books.map(book=>book.genres).reduce((allGenres, current)=>allGenres.concat(current)))
  const uniqueGenres = [...uniqueGenresSet]

  const selectGenre = (genre) => {
    getBooksByGenre({variables: {genre}})
    setGenre(genre)
  }

  return (
    <div>
      
      <h2>books</h2>
      {genre ? <h2>filtered by genre: {genre}</h2>: null}
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqueGenres.map((genre, i)=><button key={i} onClick={()=>selectGenre(genre)}>{genre}</button>)}
      <button onClick={()=>selectGenre('')}>All genres</button>
    </div>
  )
}

export default Books