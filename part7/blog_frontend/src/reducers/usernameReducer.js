export const setUsername = (value) => {
    return {
        type: 'setUsername',
        value
    }
}

const usernameReducer = (state='', action) => {
    switch(action.type){
        case 'setUsername':
            return action.value
        default:
            return state
    }
}

export default usernameReducer