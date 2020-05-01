export const setUser = (user) => {
    return {
        type: 'setUser',
        user
    }
}

const userReducer = (state=null, action) => {
    switch(action.type){
        case 'setUser':{
            return action.user
        }
        default:
            return state
    }
}

export default userReducer