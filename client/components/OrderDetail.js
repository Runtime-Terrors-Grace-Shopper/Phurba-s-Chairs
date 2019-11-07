import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      products: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/order/${this.props.location.state.id}`)
    this.setState({
      address: data.shippingAddress,
      products: data.orderProducts.map(item => [
        item.product.name,
        item.quantity
      ])
    })
  }

  render() {
    return (
      <div>
        <h3>Thank You for your Purchase!</h3>
        <p>Your Phurbiture will arrive soon!</p>
        <div>
          <h3>Order Summary:</h3>
          <p>{this.state.products}</p>
          <p>{this.props.match.params.total}</p>
          <p>{this.state.address}</p>
        </div>
      </div>
    )
  }
}

export default OrderDetail
