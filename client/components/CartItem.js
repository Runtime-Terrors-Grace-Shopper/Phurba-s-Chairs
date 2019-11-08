import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const {id, name, price, quantity} = props

  return (
    <div>
      <Link to={`/products/${id}`}>
        <p>{name}</p>
      </Link>
      <p>{price} Each</p>
      <p>{quantity}</p>
    </div>
  )
}

export default CartItem
