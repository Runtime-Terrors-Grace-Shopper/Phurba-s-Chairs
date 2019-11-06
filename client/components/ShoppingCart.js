import React from 'react'
import {connect} from 'react-redux'
import {getCart, checkoutCart} from '../store/cart'
import CartItem from './CartItem'

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
    // console.log('cart', cart)
    // console.log('cart zero', cart[0].orderProduct.quantity)
    let total = 0
    cart.forEach(item => {
      let itemTotal = item.price * item.orderProduct.quantity
      total = total += itemTotal
    })
    return (
      <div>
        <h3>Cart</h3>
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <CartItem
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.orderProduct.quantity}
              />
            </div>
          ))}
          <div>
            <h3>Subtotal:</h3>
            <div>
              <p>{total.toFixed(2)}</p>
              <div>
                <button type="submit" onClick={() => this.handleSubmit()}>
                  Checkout
                </button>
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
