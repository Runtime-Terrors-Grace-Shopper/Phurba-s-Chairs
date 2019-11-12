import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'
import {addItemToCart} from '../store/cart'

class AllProducts extends React.Component {
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
    this.props.history.push({
      pathname: '/cart'
    })
  }
  render() {
    let categories = []
    let products = this.props.products

    products.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category)
      }
    })

    return (
      <div id="products">
        <h1>ALL PRODUCTS</h1>
        {categories.map((category, index) => {
          return (
            <ul className="category" key={index}>
              <h1>{category}s</h1>
              {products.map((product, index) => {
                if (product.category === category) {
                  return (
                    <li className="category-item" key={index}>
                      <Link to={`/products/${product.id}`}>
                        {`${product.name}, ${product.id}, ${product.stock}`}
                      </Link>
                      <p>${product.price}</p>
                      <button
                        onClick={() =>
                          this.addOneToCart(product.id, product.price)
                        }
                        className="btn btn-primary"
                        type="button"
                        disabled={!product.stock}
                      >
                        {product.stock ? `ADD TO CART` : `SOLD OUT`}
                      </button>
                      <img src={product.imageUrl} />
                    </li>
                  )
                }
              })}
            </ul>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.allProducts,
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addItemToCart: item => dispatch(addItemToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
