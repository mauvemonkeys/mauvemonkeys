import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, editUser} from '../store'
import UserProfile from './userProfile'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {
    id,
    name,
    displayName,
    handleSubmit,
    error,
    isLoggedIn,
    isSigningUp
  } = props

  return (
    <div>
      {isLoggedIn && !isSigningUp && <UserProfile />}

      <form onSubmit={handleSubmit} id={id} name={name}>
        {!isLoggedIn && !isSigningUp ? (
          <div />
        ) : (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="phone">
                <small>Phone</small>
              </label>
              <input name="phone" type="text" pattern="[0-9]*" />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {!isLoggedIn && <a href="/auth/google">{displayName} with Google</a>}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    isLoggedIn: !!state.user.id,
    isSigningUp: true,
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapEditUser = state => {
  return {
    isLoggedIn: !!state.user.id,
    isSigningUp: false,
    name: 'editUser',
    displayName: 'Edit User',
    error: state.user.error,
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      if (formName === 'editUser') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const phone = +evt.target.phone.value
        const id = evt.target.id
        dispatch(editUser({firstName, lastName, email, password, id, phone}))
      } else if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const phone = +evt.target.phone.value
        dispatch(auth(email, password, formName, firstName, lastName, phone))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
export const EditUser = connect(mapEditUser, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
