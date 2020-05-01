export const setTitle = (value) => {
    return {
        type: 'setTitle',
        value
    }
}

const titleReducer = (state='', action) => {
    switch(action.type){
        case 'setTitle':
            return action.value
        default:
            return state
    }   
}

export default titleReducer