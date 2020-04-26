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
        headers: {Authorization: token}
    }
    const response = await axios.post(base_URL, newBlog, config)
    return response.data
}

export default {getBlogs, createBlog, setToken}