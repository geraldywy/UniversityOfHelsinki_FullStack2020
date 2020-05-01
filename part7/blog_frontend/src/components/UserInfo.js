import React from 'react'
import Blogs from './Blogs'
import { useSelector } from 'react-redux'

const UserInfo = ({userInfo}) => {
    const blogs = useSelector(state=>state.blogs)
    if (!userInfo){
        return (
            <div>
                <h2>No such user...</h2>
                
            </div>
        )
    }
    const userBlogs = blogs.filter(blog=>userInfo.blogs.map(blog=>blog.id).includes(blog.id))
    return(
        <div>
            <h2>{userInfo.name}</h2>
            <h3>added blogs</h3>
            <Blogs blogs={userBlogs} />
        </div>
    )
}

export default UserInfo