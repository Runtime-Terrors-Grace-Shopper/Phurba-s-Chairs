import axios from 'axios'

const GOT_COMPLETED_ORDERS = 'GOT_COMPLETED_ORDERS'
const GOT_ACTIVE_ORDER = 'GOT_ACTIVE_ORDER'

const gotCompletedOrders = orders => {
  return {type: GOT_COMPLETED_ORDERS, orders}
}

const gotActiveOrder = order => {
  return {type: GOT_ACTIVE_ORDER, order}
}

export const getCompletedOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order')
    dispatch(gotCompletedOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const getActiveOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/${id}`)
    dispatch(gotActiveOrder(data))
  } catch (error) {
    console.error(error)
  }
}

const orderState = {
  pastOrders: [],
  activeOrder: {}
}

const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case GOT_COMPLETED_ORDERS:
      return {...state, pastOrders: action.orders}
    case GOT_ACTIVE_ORDER:
      return {...state, activeOrder: action.order}
    default:
      return state
  }
}

export default orderReducer
