import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import product from './product'

const reducer = combineReducers({user, cart, product})
// sets middleware to production
let middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
if (process.env.NODE_ENV === 'development') {
  const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
  )
}

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './product'
