export const createFilter = (filter) =>{
    return {
        type:'updateFilter',
        filter
    }
}

const filterReducer = (state='', action) => {
    switch(action.type){
        case 'updateFilter':
            return action.filter
        default:
            return state
    }
}

export default filterReducer