import React from 'react'
import {successNotif, clearNotif, errorNotif} from '../reducers/notificationReducer'
import {formatCreateBlog}  from '../reducers/blogReducer'
import {updateUsersBlogs} from '../reducers/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {setUrl} from '../reducers/urlReducer'
import {setAuthor} from '../reducers/authorReducer'
import {setTitle} from '../reducers/titleReducer'

import {
  TextField,
  Button
} from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  let timeoutId
  const title = useSelector(state=>state.title)
  const author = useSelector(state=>state.author)
  const url = useSelector(state=>state.url)

  const addBlog = async (newBlog) => {
    try {
      dispatch(formatCreateBlog(newBlog, user))
      dispatch(updateUsersBlogs(newBlog, user))
      clearTimeout(timeoutId)
      dispatch(successNotif(`${newBlog.title} has been successfully added!`))
      timeoutId = setTimeout(() => {
        dispatch(clearNotif())
      }, 5000)
    } catch (exception) {
      clearTimeout(timeoutId)
      dispatch(errorNotif('title, author, url are required'))
      timeoutId = setTimeout(() => {
        dispatch(clearNotif())
      }, 5000)
    }
  }

  const createNewblog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addBlog(newBlog)
    dispatch(setTitle(''))
    dispatch(setAuthor(''))
    dispatch(setUrl(''))
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createNewblog}>
        <TextField
          label='title'
          id='title'
          type="text"
          value={title}
          onChange={({ target }) => dispatch(setTitle(target.value))}
        />
        <br />
        <TextField
          label='author'
          id='author'
          type="text"
          value={author}
          onChange={({ target }) => dispatch(setAuthor(target.value))}
        />
        <br />
        <TextField
          label='url'
          id='url'
          type="text"
          value={url}
          onChange={({ target }) => dispatch(setUrl(target.value))}
        />
        <br></br>
        <br></br>
        <Button variant='contained' color='primary' id='create' type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm
