import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import  {ALL_BOOKS, ME, BOOK_ADDED} from './queries'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const [notif, setNotif] = useState('')
  const [user, setUser] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)
  const [getMe, meResult] = useLazyQuery(ME)


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      console.log(addedBook)
    }
  })

  useEffect(()=>{
    console.log('checking window local storage for token')
    const token = window.localStorage.getItem('token')
    if (token){
      setToken(token)
    }
  }, [token])

  useEffect(()=>{
    if (meResult.data){
      setUser(meResult.data.me)
    }
  },  [meResult.data])
  
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  const Notif = ({notif})  => {
    return (
      <div>
        {notif}
      </div>
    )
  }
  
  const notify = (message) => {
    setNotif(message)
    setTimeout(() => {
      setNotif('')    
    }, 5000);
  }

  const goRec = () => {
    setPage('recommend')
    getMe()
  }

  if (result.loading){
    return <p>loading...</p>
  }
  if (result.error)
    return <p>Books page error</p>


  return (
    <div>
      <Notif notif={notif} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
            <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={goRec}>recommendations</button>
            <button onClick={handleLogout}>log out</button>
            </div>
           :
          <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        token = {token}
      />

      <Books
        show={page === 'books'}
        books = {result.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith = {updateCacheWith}
      />
      {
        user ? <Recommend show={page==='recommend'} favoriteGenre={user.favoriteGenre}/>
        : null
      }
      
      

      <LoginForm
        show={page==='login'}
        setToken = {setToken}
        notify = {notify}
        setPage = {setPage}
      />

    </div>
  )
}

export default App