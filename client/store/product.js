import axios from 'axios'

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const DELETED_PRODUCT = 'DELETED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

const gotAllProducts = products => {
  return {type: GOT_ALL_PRODUCTS, products}
}

const gotSingleProduct = product => {
  return {type: GOT_SINGLE_PRODUCT, product}
}

const addedProduct = product => {
  return {type: ADDED_PRODUCT, product}
}

const deletedProduct = productId => {
  return {type: DELETED_PRODUCT, productId}
}

const updatedProduct = product => {
  return {type: UPDATED_PRODUCT, product}
}

export const getAllProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(gotAllProducts(data))
}

export const getSingleProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(getSingleProduct(data))
}

const initialState = {
  allProducts: [],
  singleProduct: {}
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case ADDED_PRODUCT:
      return {...state, allProducts: [...state.products, action.product]}
    case DELETED_PRODUCT:
      return {
        ...state,
        allProducts: state.products.filter(product => {
          return product.id !== action.productId
        })
      }
    case UPDATED_PRODUCT:
      return {
        ...state,
        allProducts: state.products.map(product => {
          return product.id === action.product.id ? action.product : product
        })
      }
    default:
      return state
  }
}

export default productReducer
