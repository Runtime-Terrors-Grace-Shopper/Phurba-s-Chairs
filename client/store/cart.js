import axios from 'axios'

const CHECKED_OUT_CART = 'CHECKED_OUT_CART'
const GOT_CART = 'GOT_CART'
const GOT_ITEM_IN_CART = 'GOT_ITEM_IN_CART'
const ADDED_ITEM_TO_CART = 'ADDED_ITEM_TO_CART'
const DELETED_ITEM_FROM_CART = 'DELETED_ITEM_FROM_CART'
const EDITED_ITEM_IN_CART = 'EDITED_ITEM_IN_CART'
const INCREASED_QUANTITY = 'INCREASED_QUANTITY'
const DECREASED_QUANTITY = 'DECREASED_QUANTITY'

const checkedOutCart = () => {
  return {type: CHECKED_OUT_CART}
}

const gotCart = items => {
  return {type: GOT_CART, items}
}

const gotItemInCart = item => {
  return {type: GOT_ITEM_IN_CART, item}
}

const addedItemToCart = cart => {
  return {type: ADDED_ITEM_TO_CART, cart}
}

const deletedItemFromCart = itemId => {
  return {type: DELETED_ITEM_FROM_CART, itemId}
}

const increasedQuantity = item => {
  return {type: INCREASED_QUANTITY, item}
}
const decreasedQuantity = item => {
  return {type: DECREASED_QUANTITY, item}
}

const editedItemInCart = item => {
  return {type: EDITED_ITEM_IN_CART, item}
}

export const checkoutCart = () => async dispatch => {
  try {
    await axios.post('/api/cart/checkout')
    dispatch(checkedOutCart())
  } catch (error) {
    console.error(error)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    console.log('thunk', data)
    dispatch(gotCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const getItemInCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${id}`)
    dispatch(gotItemInCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const addItemToCart = body => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', body)
    const cart = data.orderProducts ? data.orderProducts : data.cart
    dispatch(addedItemToCart(cart))
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemFromCart = id => async dispatch => {
  try {
    await axios.delete(`/api/cart/${id}`)
    dispatch(deletedItemFromCart(id))
  } catch (error) {
    console.error(error)
  }
}

export const increaseQuantity = id => async dispatch => {
  try {
    const {data} = await axios.put(`api/cart/increase/${id}`)
    dispatch(increasedQuantity(data))
  } catch (error) {
    console.error(error)
  }
}

export const decreaseQuantity = id => async dispatch => {
  try {
    const {data} = await axios.put(`api/cart/decrease/${id}`)
    dispatch(decreasedQuantity(data))
  } catch (error) {
    console.error(error)
  }
}

export const editItemInCart = (id, body) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${id}`, body)
    dispatch(editedItemInCart(data))
  } catch (error) {
    console.error(error)
  }
}

const cartState = {
  cart: [],
  cartItem: {}
}

const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.items}
    case GOT_ITEM_IN_CART:
      return {...state, cartItem: action.item}
    case ADDED_ITEM_TO_CART:
      return {...state, cart: action.cart}
    case DELETED_ITEM_FROM_CART:
      let copy = [...state.cart]
      let updated = copy.filter(item => {
        return item.productId !== action.itemId
      })
      return {
        ...state,
        cart: updated
      }
    case INCREASED_QUANTITY:
      let beforeIncrease = [...state.cart]
      let afterIncrease = beforeIncrease.map(item => {
        if (item.productId === action.item.productId) return action.item
        else return item
      })
      return {...state, cart: afterIncrease}
    case DECREASED_QUANTITY:
      let beforeDecrease = [...state.cart]
      let afterDecrease = beforeDecrease.map(item => {
        if (item.productId === action.item.productId) return action.item
        else return item
      })
      let filtered = afterDecrease.filter(item => {
        return item.quantity > 0
      })
      return {...state, cart: filtered}
    // case EDITED_ITEM_IN_CART:
    //   return {
    //     ...state,
    //     cart: state.cart.map(item => {
    //       return item.id === action.item.id ? action.item : item
    //     })
    //   }
    case CHECKED_OUT_CART:
      return {...state, cart: []}
    default:
      return state
  }
}

export default cartReducer
