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
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProduct = body => async dispatch => {
  const {data} = await axios.post('/api/products', body)
  dispatch(addedProduct(data))
}

export const deleteProduct = id => async dispatch => {
  await axios.delete(`/api/products/${id}`)
  dispatch(deletedProduct(id))
}

export const updateProduct = (id, body) => async dispatch => {
  const {data} = await axios.put(`/api/products/${id}`, body)
  dispatch(updatedProduct(data))
}

const productState = {
  allProducts: [],
  singleProduct: {}
}

const productReducer = (state = productState, action) => {
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
