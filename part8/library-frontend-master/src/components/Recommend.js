import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import {ME, ALL_BOOKS_BY_GENRE} from '../queries'

const Recommend = ({show,  favoriteGenre}) => {
    const [getBooksByGenre, result]  = useLazyQuery(ALL_BOOKS_BY_GENRE)
    const [books, setBooks] = useState([])

    useEffect(()=> {
        getBooksByGenre({
            variables: {
                genre: favoriteGenre
            }
        })
        console.log('flag', result.data)
        if (result.data)
            setBooks(result.data.allBooks)
            
    }, [result.data, getBooksByGenre, favoriteGenre])

    if (!show){
        return null
    }
    if (result.loading)
        return <p>loading...</p>
    if (result.error)
        return <p>error with Recomendations</p>

    console.log('books', books)
    return (
        <div>
            <h2>Recomendations</h2>
            <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
            <table>
                <tbody>
                <tr>
                    <th>title</th>
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
        </div>
    )
}


export default Recommend