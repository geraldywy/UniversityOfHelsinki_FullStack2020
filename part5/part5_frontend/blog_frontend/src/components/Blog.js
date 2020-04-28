import React, { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [view, SetView] = useState(false)

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

  if (!view) {
    return (
      <li className="Blog" style={blogStyle}>
        {blog.title} by {blog.author} <button className='viewButton' onClick={toggleView}>View</button>
      </li>
    )
  }

  return (
    <li className="BlogAll" style={blogStyle}>
      {blog.title} by {blog.author}
      <br />
      {blog.url}
      <br />
      likes: {blog.likes} <button className='likeButton' onClick={() => addLike(blog)}>like</button>
      {blog.user
        ? blog.user.name === user.name && blog.user.username === user.username
          ? deleteButton()
          : null
        : null}
    </li>
  )
}

export default Blog
