import React from 'react'
import {Link} from 'react-router-dom'

class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push({
      pathname: '/cart'
    })
  }

  render() {
    const quantity = this.props.quantity
    return (
      <div id="test1" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {quantity > 1 ? (
                <p>{`Added ${quantity} to Cart`}</p>
              ) : (
                <p>Added 1 to Cart</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Continue Shopping
              </button>
              <button
                onClick={this.handleClick}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Go To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
