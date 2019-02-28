import React from 'react'
import {connect} from 'react-redux'

const userProfile = props => {
  const {firstName, lastName, phone, email} = props.user

  return (
    <div>
      <h3>Current User Profile</h3>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Phone: {phone}</div>
      <div>Email: {email}</div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(userProfile)
