import React from 'react'
import Blog from './Blog'
import {
  TableContainer,
  Table,
  TableBody,
  Paper
} from '@material-ui/core'

const Blogs = ({blogs}) => {
    return (
    <TableContainer component={Paper} id='blogs'>
      <Table>
        <TableBody>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </TableBody>
      </Table>
        
      </TableContainer>
)}

export default Blogs