import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usernameReducer from './reducers/usernameReducer'
import passwordReducer from './reducers/passwordReducer'
import viewReducer from './reducers/viewReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'
import titleReducer from './reducers/titleReducer'
import authorReducer from './reducers/authorReducer'
import urlReducer from './reducers/urlReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notif: notificationReducer,
    user: userReducer,
    username: usernameReducer,
    password: passwordReducer,
    view: viewReducer,
    users: usersReducer,
    comment: commentReducer,
    title: titleReducer,
    author: authorReducer,
    url: urlReducer
})


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store