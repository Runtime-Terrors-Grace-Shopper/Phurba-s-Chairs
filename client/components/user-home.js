import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllCategories from './AllCategories'
import Deals from './Deals'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div
      id="rooms"
      className="carousel slide"
      data-ride="carousel"
      data-interval="3000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="jumbotron carousel-caption">
          <div id="home">
            {isLoggedIn ? (
              <h1 className="display-3">Welcome Back to Phurbiture {email} </h1>
            ) : (
              <h1 className="display-3">Welcome to Phurbiture</h1>
            )}
          </div>
        </div>
      </div>

      <AllCategories />
      <Deals />
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
