import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getCart, checkoutCart} from '../store/cart'
import CartItem from './CartItem'
import OrderDetail from './OrderDetail'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit() {
    this.props.checkoutCart()
  }

  render() {
    const {cart} = this.props
    if (cart.length <= 0) {
      return null
    }
    let total = 0
    cart.forEach(item => {
      let itemTotal = item.purchasingPrice * item.quantity
      total += itemTotal
    })
    return (
      <div>
        <h3>Cart</h3>
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <CartItem
                id={item.productId}
                name={item.purchasingPrice}
                //price={item.price}
                // quantity={item.quantity}
              />
            </div>
          ))}
          <div>
            <h3>Subtotal:</h3>
            <div>
              <p>{total.toFixed(2)}</p>
              <div>
                <Link
                  to={{
                    pathname: `/cart/checkout/${total}`,
                    state: {id: cart[0].orderId}
                  }}
                >
                  <button type="submit" onClick={() => this.handleSubmit()}>
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  checkoutCart: () => dispatch(checkoutCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
