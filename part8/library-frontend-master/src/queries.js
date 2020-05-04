import {gql} from '@apollo/client'

const BOOK_DETAILS  = gql`
    fragment BookDetails on Book {
        title
        author{
            name
        }
        published
        genres
    }
`

export const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author{
                name
            }
            published
            genres
        }
    }
`

export const ALL_BOOKS_BY_GENRE =  gql`
    query allBooks($genre: String!) {
        allBooks(genre: $genre){
            title
            author{
                name
            }
            published
        }
    }
`

export const ME = gql`
    query {
        me{
            username
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`