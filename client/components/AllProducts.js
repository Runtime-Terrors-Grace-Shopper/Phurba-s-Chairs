import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'

class AllProducts extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    let categories = []
    let products = this.props.products
    products.forEach(product => {
      if (!categories.includes(product.category.name)) {
        categories.push(product.category.name)
      }
    })

    return (
      <div>
        {categories.map((category, index) => {
          return (
            <ul key={index}>
              <h1>{category}s</h1>
              {products.map((product, index) => {
                if (product.category.name === category) {
                  return (
                    <li key={index}>
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <button type="button">ADD TO CART</button>
                      {/*button disabled when qty is 0;*/}
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
  products: state.product.allProducts
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
