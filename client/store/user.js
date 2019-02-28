import axios from 'axios'
import history from '../history'
import {getCart, getCartLocal} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    await dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    await dispatch(getUser(res.data))
    await dispatch(getCart())
    history.push('/products')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(getCartLocal())
    history.push('/products')
  } catch (err) {
    console.error(err)
  }
}

export const editUser = userInfo => async dispatch => {
  try {
    await axios.put('/auth/editUser', userInfo)
    dispatch(updateUser(userInfo))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      let updatedUser = {}
      for (let key in action.user) {
        if (action.user[key] !== '' && action.user[key] !== 0) {
          updatedUser[key] = action.user[key]
        }
      }
      console.log('========>', updatedUser)
      return {...state, ...updatedUser}
    default:
      return state
  }
}
