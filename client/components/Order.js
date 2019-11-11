import React from 'react'

const Order = props => {
  const {id, placedOn, products} = props
  let total = 0
  if (products) {
    products.forEach(item => {
      let itemTotal = item.product.price * item.quantity
      total += itemTotal
    })
  }
  return (
    <div key={id}>
      {products.map(item => (
        <div key={item.id}>
          <p>
            {item.quantity} {item.product.name}
          </p>
          <p>{item.product.price} Each</p>
        </div>
      ))}
      <div>
        <h3>Total: {total}</h3>
        <p>{placedOn}</p>
      </div>
    </div>
  )
}

export default Order
