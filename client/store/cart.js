import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const GOT_UPDATED_CART_LINE = 'GOT_UPDATED_CART_LINE'
const DELETED_CART_ITEM = 'DELETED_CART_ITEM'
const CLEAR_CART = 'CLEAR_CART'
/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const gotUpdatedCartLine = cartLine => ({type: GOT_UPDATED_CART_LINE, cartLine})
const deletedCartItem = productId => ({
  type: DELETED_CART_ITEM,
  productId
})

export const clearCart = () => ({type: CLEAR_CART})
/**
 * THUNK CREATORS
 */
export const getCart = () => async (dispatch, getState) => {
  try {
    const userId = getState().user.id
    const res = await axios.get(`/api/orders/${userId}`)
    const cart = res.data
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const getCartLocal = () => async dispatch => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  let productPromises = []
  localCart.forEach(({productId}) => {
    productPromises.push(axios.get(`/api/products/${productId}`))
  })

  productPromises = await Promise.all(productPromises)

  const updatedLocalCart = localCart.map((line, i) => {
    return {...line, product: productPromises[i].data}
  })

  dispatch(gotCart(updatedLocalCart))
}

export const updateItemQuantity = (productId, itemQuantity) => async (
  dispatch,
  getState
) => {
  try {
    const userId = getState().user.id
    const res = await axios.put(`/api/orders/${userId}/products/${productId}`, {
      itemQuantity
    })
    const cartLine = res.data
    dispatch(gotUpdatedCartLine(cartLine))
  } catch (err) {
    console.error(err)
  }
}

export const updateItemQuantityLocal = (productId, itemQuantity) => (
  dispatch,
  getState
) => {
  const cartLine = getState().cart.find(cl => cl.productId === productId)
  const updatedCartLine = {...cartLine, itemQuantity}

  const updatedCartForLS = getState().cart.map(cl => {
    return cl.productId === productId ? updatedCartLine : {...cl}
  })

  localStorage.setItem('cart', JSON.stringify(updatedCartForLS))

  dispatch(gotUpdatedCartLine(updatedCartLine))
}

export const deleteItem = productId => async (dispatch, getState) => {
  try {
    const userId = getState().user.id
    await axios.delete(`/api/orders/${userId}/products/${productId}`)
    dispatch(deletedCartItem(productId))
  } catch (err) {
    console.error(err)
  }
}
export const deleteItemLocal = productId => (dispatch, getState) => {
  const updatedCartForLS = getState().cart.filter(cl => {
    return cl.productId !== productId
  })

  localStorage.setItem('cart', JSON.stringify(updatedCartForLS))

  dispatch(deletedCartItem(productId))
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case GOT_UPDATED_CART_LINE:
      return state.map(cartLine => {
        return cartLine.id === action.cartLine.id
          ? action.cartLine
          : {...cartLine}
      })
    case DELETED_CART_ITEM:
      state = state.filter(cartLine => {
        return cartLine.product.id !== action.productId
      })
      return state
    case CLEAR_CART:
      state = defaultCart
      return state
    default:
      return state
  }
}
