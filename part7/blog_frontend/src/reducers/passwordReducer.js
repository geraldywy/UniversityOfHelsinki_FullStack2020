
export const setPassword = (value) => {
    return{
        type: 'setPassword',
        value
    }
}

const passwordReducer = (state='', action) => {
    switch(action.type){
        case 'setPassword': {
            return action.value
        }
        default:
            return state
    }
}

export default passwordReducer