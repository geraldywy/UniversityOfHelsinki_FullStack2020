import React from 'react'

const Blog = ({blog}) => {
    return (
        <li className='Blog'>
            {blog.title} by {blog.author}
        </li>
    )
}

export default Blog