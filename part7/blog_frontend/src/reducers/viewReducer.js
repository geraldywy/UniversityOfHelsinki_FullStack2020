export const setView = (value) => {
    return {
        type: 'setView',
        value
    }
}

const viewReducer = (state=false, action) => {
    switch(action.type){
        case 'setView':
            return action.value
        default:
            return state
    }
}

export default viewReducer