export const setComment = (value) => {
    return {
        type: 'setComment',
        value
    }
}

const commentReducer = (state='', action) => {
    switch(action.type){
        case 'setComment':
            return action.value
        default:
            return state
    }   
}

export default commentReducer