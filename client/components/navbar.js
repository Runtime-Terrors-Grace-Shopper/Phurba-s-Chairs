import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getAllProducts} from '../store/product'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link to="/home" className="navbar-brand">
        Phurbiture
      </Link>
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
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="productsDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Products
              </a>
              <div className="dropdown-menu">
                <Link to="/products" className="dropdown-item">
                  All Products
                </Link>
                <Link to="/category/Chairs" className="dropdown-item">
                  Chairs
                </Link>
                <Link to="/category/Tables" className="dropdown-item">
                  Tables
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                MyCart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                Orders
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            {/* The navbar will show these links before you log in */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="productsDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Products
              </a>
              <div className="dropdown-menu">
                <Link to="/products" className="dropdown-item">
                  All Products
                </Link>
                <Link to="/category/Chairs" className="dropdown-item">
                  Chairs
                </Link>
                <Link to="/category/Tables" className="dropdown-item">
                  Tables
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                MyCart
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
