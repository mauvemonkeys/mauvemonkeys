import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearUserError} from '../store'

class Navbar extends Component {
  render() {
    const {isLoggedIn, handleClick, cart, clearUserError} = this.props
    return (
      <div className="navbar">
        <div className="logo-div">
          <h1 className="logo">Stickr</h1>
        </div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/products" className="nav-links">
                Products
              </Link>
              <Link to="/cart" className="nav-links">
                Cart ({cart.length})
              </Link>
              <Link to="/profile" className="nav-links">
                Profile
              </Link>
              <a href="#" onClick={handleClick} className="nav-links">
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products" className="nav-links">
                Products
              </Link>
              <Link to="/cart" className="nav-links">
                Cart ({cart.length})
              </Link>
              <Link to="/login" onClick={clearUserError} className="nav-links">
                Login
              </Link>
              <Link to="/signup" onClick={clearUserError} className="nav-links">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    clearUserError() {
      dispatch(clearUserError())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
