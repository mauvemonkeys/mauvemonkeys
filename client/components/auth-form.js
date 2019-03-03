import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, editUser} from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.name === 'editUser') {
      this.setState({
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        phone: this.props.user.phone || '',
        email: this.props.user.email || ''
      })
    }
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const formName = this.props.name
    const {firstName, lastName, phone, email, password} = this.state
    if (formName === 'editUser') {
      this.props.editUser({firstName, lastName, email, password, phone})
    } else if (formName === 'signup') {
      this.props.auth(email, password, formName, firstName, lastName, phone)
    } else {
      this.props.auth(email, password, formName)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {name, headerText, buttonText, error, isLoggedIn} = this.props
    const {firstName, lastName, phone, email, password} = this.state
    return (
      <div id="form">
        <h3>{headerText}</h3>
        <form onSubmit={this.handleSubmit}>
          {['signup', 'editUser'].includes(name) && (
            <div>
              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">
                  <small>Phone</small>
                </label>
                <input
                  name="phone"
                  type="text"
                  placeholder="(xxx) xxx-xxxx"
                  pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                  value={phone}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">{buttonText}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {!isLoggedIn && <a href="/auth/google">{headerText} with Google</a>}
      </div>
    )
  }
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
    headerText: 'Login',
    buttonText: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'signup',
    headerText: 'Sign Up',
    buttonText: 'Submit',
    error: state.user.error
  }
}

const mapEditUser = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    name: 'editUser',
    headerText: 'Update Profile',
    buttonText: 'Submit',
    error: state.user.error,
    id: state.user.id
  }
}

export const Login = connect(mapLogin, {auth})(AuthForm)
export const Signup = connect(mapSignup, {auth})(AuthForm)
export const EditUser = connect(mapEditUser, {editUser})(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object
}
