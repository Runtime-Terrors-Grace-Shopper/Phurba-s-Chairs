import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const {id, name, price, quantity} = props
  return (
    <div>
      <Link to={`/products/${id}`}>
        <p>{name}</p>
      </Link>
      <button>-</button>
      <p>{quantity}</p>
      <button>+</button>
      <button>Remove From Cart</button>
      <p>{(price * quantity).toFixed(2)}</p>
    </div>
  )
}

export default CartItem
