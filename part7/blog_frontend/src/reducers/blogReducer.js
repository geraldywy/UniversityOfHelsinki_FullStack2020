import blogService from '../services/blogs'

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getBlogs()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
    })
}}

export const formatUpvoteBlog  = (blog) => {
    return async (dispatch)=>{
        const updatedBlog = await blogService.addOneLike(blog)
        dispatch({
        type: 'addLike',
        updatedBlog
        })
    }}

export const formatCreateBlog = (newBlog, user) => {
    return async dispatch => {
        const addedBlog = await blogService.createBlog(newBlog)
        dispatch({
            type: 'create',
            addedBlog
        })
    }
}

export const formatDeleteBlog = (blogToDelete) => {
    return async dispatch => {
        await blogService.deleteBlog(blogToDelete)
        dispatch({
            type: 'delete',
            blogToDelete
        })
    }
}

export const formatCommentBlog = (blog, comment) => {
    return async dispatch => {
        const updatedBlog = await blogService.commentBlog(blog, comment)
        dispatch({
            type: 'commentBlog',
            updatedBlog
        })
    }
}

const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_BLOGS': {
            return action.blogs.sort((a, b) => b.likes - a.likes)
        }
        case 'addLike': {
            return state.filter(b=>b.id===action.updatedBlog.id ? action.updatedBlog: b).sort((a, b) => b.likes - a.likes)
        }
        case 'create': {
            return [...state, action.addedBlog]
        }
        case 'delete': {
            return state.filter(b=>b.id!==action.blogToDelete.id)
        }
        case 'commentBlog': {
            return state.map(blog=>blog.id===action.updatedBlog.id ? action.updatedBlog: blog)
        }
        default:
            return state
    }
}

export default blogReducer