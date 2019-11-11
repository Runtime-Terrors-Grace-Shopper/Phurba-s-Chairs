import React from 'react'

const Order = props => {
  const {id, placedOn, products} = props
  let total = 0
  if (products) {
    products.forEach(item => {
      let itemTotal = item.purchasingPrice * item.quantity
      total += itemTotal
    })
  }
  return (
    <div key={id}>
      {products.map(item => (
        <div key={item.id}>
          <p>
            {item.quantity} {item.product.name} - {item.purchasingPrice} Each
          </p>
        </div>
      ))}
      <div>
        <h5>Total: {total.toFixed(2)}</h5>
        <p>Order Placed on {placedOn.slice(0, 10)}</p>
        <br />
      </div>
    </div>
  )
}

export default Order
