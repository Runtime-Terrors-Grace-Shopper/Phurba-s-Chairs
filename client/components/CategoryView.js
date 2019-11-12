import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {addItemToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Popup from './Popup'

class CategoryView extends React.Component {
  constructor(props) {
    super()
    this.addOneToCart = this.addOneToCart.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  addOneToCart(id, price) {
    const item = {
      quantity: 1,
      id,
      price
    }
    this.props.addItemToCart(item)
  }

  render() {
    let category = this.props.match.params.category
    let products = this.props.products
    return (
      <div>
        <h1>{category}</h1>
        <ul>
          {products.map((product, index) => {
            if (product.category === category.slice(0, -1)) {
              return (
                <li className="category-item" key={index}>
                  <Link to={`/products/${product.id}`}>
                    {`${product.name}, ${product.id}, ${product.stock}`}
                  </Link>
                  <p>${product.price}</p>
                  <button
                    onClick={() => this.addOneToCart(product.id, product.price)}
                    className="btn btn-primary"
                    type="button"
                    disabled={!product.stock}
                    data-toggle="modal"
                    data-target="#test1"
                  >
                    {product.stock ? `ADD TO CART` : `SOLD OUT`}
                  </button>
                  <Popup history={this.props.history} />
                  <img src={product.imageUrl} />
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.allProducts
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addItemToCart: item => dispatch(addItemToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)
