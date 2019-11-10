import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="../../../public/rooms/room.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="../../public/rooms/room2.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="../../public/rooms/room3.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
    </div>
  )

  /*
    <div className="jumbotron">
      <div id="home">
        {isLoggedIn ? (
          <h1 className="display-3">Welcome Back to Phurbiture {email} </h1>
        ) : (
          <h1 className="display-3">Welcome to Phurbiture</h1>
        )}
      </div>
    </div> */
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
