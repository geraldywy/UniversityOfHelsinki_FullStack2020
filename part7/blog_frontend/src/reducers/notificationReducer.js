
export const errorNotif = (message)=>{
    return {
        type: 'error',
        message
    }
}

export const successNotif = (message) => {
    return {
        type: 'success',
        message
    }
}

export const clearNotif = () => {
    return {
        type: 'clear'
    }
}

/*
    notification = {
        message: string
        error: boolean
    }
*/

const notificationReducer = (state=null, action) => {
    switch(action.type){
        case 'error':
            return {
                message: action.message,
                error: true
            }
        case 'success':
            return {
                message: action.message,
                error: false
            }
        case 'clear':
            return null
        default:
            return state
    }
}

export default notificationReducer