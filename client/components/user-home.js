import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div className="jumbotron">
      <div id="home">
        {isLoggedIn ? (
          <h1 className="display-3">Welcome Back to Phurbiture {email} </h1>
        ) : (
          <h1 className="display-3">Welcome to Phurbiture</h1>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
