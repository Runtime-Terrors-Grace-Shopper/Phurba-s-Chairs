import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  deleteItemFromCart,
  getItemInCart,
  increaseQuantity,
  decreaseQuantity
} from '../store/cart'

class CartItem extends React.Component {
  constructor(props) {
    super()
    this.deleteItem = this.deleteItem.bind(this)
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
  }
  increase(id) {
    this.props.increaseQuantity(id)
  }

  decrease(id) {
    this.props.decreaseQuantity(id)
  }

  deleteItem(id) {
    this.props.deleteItem(id)
  }

  render() {
    const {id, productId, name, price, quantity, imageUrl} = this.props

    return quantity ? (
      <div>
        <Link to={`/products/${productId}`}>
          <p>{name}</p>
        </Link>
        <img src={imageUrl} />
        <p>{price} Each</p>
        <button
          onClick={() => this.decrease(id)}
          className="btn btn-sm btn-secondary"
        >
          {' '}
          -{' '}
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => this.increase(id)}
          className="btn btn-sm btn-secondary"
        >
          {' '}
          +{' '}
        </button>
        <button
          onClick={() => this.deleteItem(id)}
          className="btn btn-sm btn-danger"
        >
          X
        </button>
      </div>
    ) : (
      <div />
    )
  }
}
const mapDispatchToProps = dispatch => ({
  deleteItem: id => dispatch(deleteItemFromCart(id)),
  getItemInCart: id => dispatch(getItemInCart(id)),
  increaseQuantity: id => dispatch(increaseQuantity(id)),
  decreaseQuantity: id => dispatch(decreaseQuantity(id))
})

export default connect(null, mapDispatchToProps)(CartItem)
