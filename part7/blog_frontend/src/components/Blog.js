import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {formatUpvoteBlog, formatDeleteBlog, formatCommentBlog} from '../reducers/blogReducer'
import {errorNotif, clearNotif, successNotif} from '../reducers/notificationReducer' 
import Comment from './Comment'
import {setComment} from '../reducers/commentReducer'

import {
  TableRow,
  TableCell,
  Button
} from '@material-ui/core'

const Blog = ({ blog, single }) => {
  const [view, SetView] = useState(false)
  const dispatch = useDispatch()
  let timeoutId = null

  const user = useSelector(state=>state.user)
  const addLike = (blog) => {
    dispatch(formatUpvoteBlog(blog))
    clearTimeout(timeoutId)
    dispatch(successNotif(`upvoted ${blog.title}!`))
    timeoutId = setTimeout(() => {
      dispatch(clearNotif())
      }, 5000)
}

  const deleteBlog = async (blogToDelete) => {
      try {
          if (
          window.confirm(
              `Delete ${blogToDelete.title} by ${blogToDelete.author}?`
          )
          ) {
              console.log('delete')
          dispatch(formatDeleteBlog(blogToDelete))
          clearTimeout(timeoutId)
          dispatch(successNotif(`${blogToDelete.title} has been deleted`))
          timeoutId = setTimeout(() => {
              dispatch(clearNotif())
              }, 5000)
          }
      } catch (exception) {
          clearTimeout(timeoutId)
          dispatch(errorNotif('Not authorized to delete this post'))
          timeoutId = setTimeout(() => {
          dispatch(clearNotif())
          }, 5000)
      }
  }

  const toggleView = () => {
    SetView(!view)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButton = () => (
    <div>
      <button className='deleteButton' onClick={() => deleteBlog(blog)}>Delete</button>
    </div>
  )
  
  const comment = useSelector(state=>state.comment)

  const addComment = (event) => {
    event.preventDefault()
    dispatch(formatCommentBlog(blog, comment))
    dispatch(setComment(''))
  }

  if (!blog){
    return null
  }
  if (single){ //viewing a single blog post
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={`${blog.url}`} rel="noopener noreferrer" target="_blank" >{blog.url}</a>
        <p>{blog.likes} likes<button className='likeButton' onClick={() => addLike(blog)}>like</button></p> 
        <p>added by {blog.user ? blog.user.name: 'anonymous'}</p>
        {blog.user && user
        ? (blog.user.name === user.name && blog.user.username === user.username)
          ? deleteButton()
          : null
        : null}
        <form onSubmit={addComment}>
          <h3>Comments ({`${blog.comments.length}`})</h3>
          <textarea value={comment} onChange={({target})=>dispatch(setComment(target.value))} name='addComment'></textarea><br></br>
          <button type='submit'>Add comment</button>
        </form>
        
        <table>
          <tbody>
            {blog.comments.map( (comment, i) => {
              return(
                <Comment key={i} comment={comment} />
              )
            })}
          </tbody>
        </table>
          
        
      </div>
      
    )
  }
  if (!view) {
    return (
      <TableRow className="Blog" style={blogStyle}>
        <TableCell>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          <br></br>
          <Button variant='contained' color='primary' className='viewButton' onClick={toggleView}>View</Button>
        </TableCell>
      </TableRow>
    )
  }
  return (
    <li className="BlogAll" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      <br />
      {blog.url}
      <br />
      likes: {blog.likes} <button className='likeButton' onClick={() => addLike(blog)}>like</button>
      {blog.user && user
        ? blog.user.name === user.name && blog.user.username === user.username
          ? deleteButton()
          : null
        : null}
      <button className='viewButton' onClick={toggleView}>Show less</button>
    </li>
  )
}

export default Blog
