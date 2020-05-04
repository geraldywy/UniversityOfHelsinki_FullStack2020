import {gql} from '@apollo/client'

export const ADD_BOOK = gql `
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ){
            title
            author{
                name
            }
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!){
        editAuthor(name: $name, setBornTo: $setBornTo){
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`