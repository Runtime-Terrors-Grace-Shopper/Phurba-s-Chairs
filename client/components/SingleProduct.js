import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {addItemToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super()
    this.state = {quantity: 0}
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  addToCart(e) {
    e.preventDefault()
    const {id, price} = this.props.singleProduct
    const item = {
      id,
      price,
      quantity: this.state.quantity
    }
    this.props.addItemToCart(item)
    alert(`added ${this.state.quantity} to the cart`)
  }
  handleChange(e) {
    e.preventDefault()
    this.setState({quantity: e.target.value})
  }

  render() {
    const {name, stock, description, imageUrl} = this.props.singleProduct
    return (
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} />
        <p>
          {description},there is only {stock} left
        </p>
        <form onSubmit={e => this.addToCart(e)}>
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <input type="submit" value="ADD TO CART" />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id)),
  addItemToCart: item => dispatch(addItemToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
