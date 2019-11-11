import React from 'react'
import {connect} from 'react-redux'
import {getCompletedOrders} from '../store/order'
import Order from './Order'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCompletedOrders()
  }

  render() {
    if (this.props.pastOrders.length <= 0) {
      return null
    }
    const orders = this.props.pastOrders
    return (
      <div>
        <h3>Order History</h3>
        {orders.length <= 0 ? (
          <h4>No Orders Yet</h4>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id}>
                <p>{orders.updatedAt}</p>
                <Order
                  id={order.id}
                  placedOn={order.updatedAt}
                  products={order.orderProducts}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pastOrders: state.order.pastOrders
})

const mapDispatchToProps = dispatch => ({
  getCompletedOrders: () => dispatch(getCompletedOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
