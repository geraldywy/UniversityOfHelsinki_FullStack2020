import userService from '../services/users'

export const initUsers = () => {
    return async (dispatch) => {
        const users = await userService.getUsers()
        dispatch({
            type: "INIT_USERS",
            users
        })
    }
}

export const updateUsersBlogs = (newBlog, user) => {
    return {
        type: 'updateUserBlogs',
        user,
        newBlog
    }
}

const usersReducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_USERS':
            return action.users
        case 'updateUserBlogs':{
            return state.map(user=>(user.name===action.user.name  &&  user.username===action.user.username)
                ? {
                    ...user,
                    blogs: [...user.blogs, action.newBlog]
                }
                : user)}
        default:
            return state
    }
}

export default usersReducer