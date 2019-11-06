import React from 'react'

class SingleUser extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const {name, imageUrl, email, phoneNumber, orders} = this.props
    return (
      <div>
        <p>{name}</p>
        <img src={imageUrl} />
        <p>{email}</p>
        <p>{phoneNumber}</p>
        <div>
          <h3>Order History</h3>
        </div>
      </div>
    )
  }
}
