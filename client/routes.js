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
import CategoryView from './components/CategoryView'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/category/:category" component={CategoryView} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart/checkout" component={OrderDetail} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/order" component={OrderHistory} />
        <Route component={UserHome} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
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

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
