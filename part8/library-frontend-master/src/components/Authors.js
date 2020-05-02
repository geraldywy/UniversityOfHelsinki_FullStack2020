  
import React, {useState} from 'react'
import {ALL_AUTHORS, ALL_BOOKS_NO_GENRE} from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import {UPDATE_AUTHOR} from '../mutations'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('test')
  const [born, setBorn] = useState('')
  const {loading, error, data} = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      },
      {
        query: ALL_BOOKS_NO_GENRE
      }
    ],
    onError: (error)=>{
      console.log(error)
    }
  })
  if (!props.show) {
    return null
  }
  
  const submitUpdateAuthor = (event) => {
    event.preventDefault()
    console.log('update author...')
    console.log(name, born)
    updateAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })
    setName('')
    setBorn('')
  }

  if (error){
    console.log('error lmao')
  }
  if (loading){
    return <p>Loading...</p>
  }
  const authors = data.allAuthors
  const authorsOption = authors.map(author=>{
    return {
      value: author.name,
      label: author.name
    }
  })
  console.log(name, born)
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submitUpdateAuthor}>
        <Select onChange={({value})=>setName(value)} options={authorsOption}/>
        born <input type='number' value={born} onChange={({target})=>setBorn(target.value)} />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
