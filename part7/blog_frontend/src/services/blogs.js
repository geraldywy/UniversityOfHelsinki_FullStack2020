import axios from 'axios'

const base_URL = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getBlogs = async () => {
  const response = await axios.get(base_URL)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(base_URL, newBlog, config)
  return response.data
}

const addOneLike = async (oldBlog) => {
  const updatedBlog = oldBlog
  updatedBlog.likes = oldBlog.likes + 1
  const response = await axios.put(`${base_URL}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${base_URL}/${blogToDelete.id}`, config)
}

const commentBlog = async (blog, comment) => {
  const updatedBlog = {
    ...blog,
    comments: [...blog.comments, comment]
  }
  const response = await axios.put(`${base_URL}/${updatedBlog.id}`, updatedBlog)
  return response.data
}


export default { getBlogs, createBlog, setToken, addOneLike, deleteBlog, commentBlog }
