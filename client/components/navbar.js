import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getAllProducts} from '../store/product'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <h1 className="navbar-brand" href="/home">
        Phurbiture
      </h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#myNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="myNav">
        {isLoggedIn ? (
          <ul className="navbar-nav">
            {/* The navbar will show these links after you log in */}
            <li className="nav-item">
              <Link to="/home">
                <a className="nav-link" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login">
                <a className="nav-link" href="#" onClick={handleClick}>
                  Logout
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products">
                <a className="nav-link" href="#">
                  Products
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <a className="nav-link" href="#">
                  MyCart
                </a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            {/* The navbar will show these links before you log in */}
            <li className="nav-item">
              <Link to="/login">
                <a className="nav-link" href="#">
                  Login
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products">
                <a className="nav-link" href="#">
                  Products
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <a className="nav-link" href="#">
                  MyCart
                </a>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
