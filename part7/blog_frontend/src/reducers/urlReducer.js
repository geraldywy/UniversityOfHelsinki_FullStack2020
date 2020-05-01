export const setUrl = (value) => {
    return {
        type: 'setUrl',
        value
    }
}

const urlReducer = (state='', action) => {
    switch(action.type){
        case 'setUrl':
            return action.value
        default:
            return state
    }   
}

export default urlReducer