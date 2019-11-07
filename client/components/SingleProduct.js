import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'

class SingleProduct extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {
      name,
      price,
      stock,
      category,
      description,
      color,
      imageUrl
    } = this.props.singleProduct
    return (
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} />
        <p>
          {description},there is only {stock} left
        </p>
        <input type="number" placeholder="Quantity" />
        <button type="button">ADD TO CART</button>
        <button type="button">BUY NOW</button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
