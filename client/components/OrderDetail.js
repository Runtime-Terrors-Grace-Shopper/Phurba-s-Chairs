import React from 'react'
import {connect} from 'react-redux'
import {getActiveOrder} from '../store/order'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getActiveOrder(this.props.location.state.id)
  }

  render() {
    const {orderProducts} = this.props.activeOrder
    let total = 0
    if (orderProducts) {
      orderProducts.forEach(item => {
        let itemTotal = item.purchasingPrice * item.quantity
        total += itemTotal
      })
    }
    return (
      <div>
        <h3>Thank You for your Purchase!</h3>
        <p>Your Phurbiture will arrive soon!</p>
        <div>
          <h3>Order Summary:</h3>
          <div>
            {orderProducts &&
              orderProducts.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.quantity} {item.product.name}
                  </p>
                </div>
              ))}
          </div>
          <p>Total: {total}</p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  activeOrder: state.order.activeOrder
})

const mapDispatchToProps = dispatch => ({
  getActiveOrder: id => dispatch(getActiveOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
