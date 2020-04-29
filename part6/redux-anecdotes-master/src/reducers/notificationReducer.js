const initialNotification = null
let timeoutID=null

export const upvoteNotif = (notif, i) => {
    clearTimeout(timeoutID)
    return async dispatch => {
        dispatch({
            type: 'upvote',
            notif
        })
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'remove'
            })
        }, i*1000)
    }
}


const notificationReducer = (state=initialNotification, action) => {
    switch (action.type){
        case 'upvote':
            return `You upvoted "${action.notif}"`
        case 'remove':
            return null
        default:
            return state
    }
}

export default notificationReducer