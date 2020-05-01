export const setAuthor = (value) => {
    return {
        type: 'setAuthor',
        value
    }
}

const authorReducer = (state='', action) => {
    switch(action.type){
        case 'setAuthor':
            return action.value
        default:
            return state
    }   
}

export default authorReducer