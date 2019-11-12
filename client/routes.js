import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {getUser} from './store'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import ShoppingCart from './components/ShoppingCart'
import OrderDetail from './components/OrderDetail'
import OrderHistory from './components/OrderHistory'
import NoPageFound from './components/NoPageFound'
import CategoryView from './components/CategoryView'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/category/:category" component={CategoryView} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart/checkout" component={OrderDetail} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/order" component={OrderHistory} />
        {/* Displays our Login component as a fallback */}
        <Route component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getUser())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
