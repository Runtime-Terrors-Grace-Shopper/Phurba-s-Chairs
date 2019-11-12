import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {Link} from 'react-router-dom'

class CategoryView extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.getAllProducts()
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
                  >
                    {product.stock ? `ADD TO CART` : `SOLD OUT`}
                  </button>
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
  getAllProducts: () => dispatch(getAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)
