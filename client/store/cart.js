import axios from 'axios'

const GOT_CART = 'GOT_CART'
const GOT_ITEM_IN_CART = 'GOT_ITEM_IN_CART'
const ADDED_ITEM_TO_CART = 'ADDED_ITEM_TO_CART'
const DELETED_ITEM_FROM_CART = 'DELETED_ITEM_FROM_CART'
const EDITED_ITEM_IN_CART = 'EDITED_ITEM_IN_CART'

const gotCart = items => {
  return {type: GOT_CART, items}
}

const gotItemInCart = item => {
  return {type: GOT_ITEM_IN_CART, item}
}

const addedItemToCart = item => {
  return {type: ADDED_ITEM_TO_CART, item}
}

const deletedItemFromCart = itemId => {
  return {type: DELETED_ITEM_FROM_CART, itemId}
}

const editedItemInCart = item => {
  return {type: EDITED_ITEM_IN_CART, item}
}

export const getCart = () => async dispatch => {
  // try/catchhhhhhhh
  const {data} = await axios.get('/cart')
  dispatch(gotCart(data))
}

export const getItemInCart = id => async dispatch => {
  const {data} = await axios.get(`/cart/${id}`)
  dispatch(gotItemInCart(data))
}

export const addItemToCart = body => async dispatch => {
  const {data} = await axios.post('/cart', body)
  dispatch(addedItemToCart(data))
}

export const deleteItemFromCart = id => async dispatch => {
  await axios.delete(`/cart/${id}`)
  dispatch(deletedItemFromCart(id))
}

export const editItemInCart = (id, body) => async dispatch => {
  const {data} = await axios.put(`/cart/${id}`, body)
  dispatch(editedItemInCart(data))
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
      return {...state, cart: [...state.cart, action.item]}
    case DELETED_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => {
          // niceee
          return item.id !== action.itemId
        })
      }
    case EDITED_ITEM_IN_CART:
      return {
        ...state,
        cart: state.cart.map(item => {
          return item.id === action.item.id ? action.item : item
        })
      }
    default:
      return state
  }
}

export default cartReducer
