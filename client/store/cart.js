import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const GOT_UPDATED_CART_LINE = 'GOT_UPDATED_CART_LINE'
const GOT_NEW_CART_LINE = 'GOT_NEW_CART_LINE'
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
const gotNewCartLine = cartLine => ({type: GOT_NEW_CART_LINE, cartLine})

export const clearCart = () => ({type: CLEAR_CART})
/**
 * THUNK CREATORS
 */

export const setCart = () => async (dispatch, getState) => {
  try {
    const userId = getState().user.id
    const res = await axios.post(`/api/orders/${userId}`, {
      cart: getState().cart
    })
    const cart = res.data
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const setCartLogin = () => async (dispatch, getState) => {
  try {
    const userId = getState().user.id
    const res = await axios.post(`/api/orders/${userId}/reconcile`, {
      cart: getState().cart
    })
    const cart = res.data
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

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

export const updateItemQuantity = (productId, itemQuantity, from) => async (
  dispatch,
  getState
) => {
  try {
    const userId = getState().user.id
    const res = await axios.put(
      `/api/orders/${userId}/products/${productId}/${from}`,
      {
        itemQuantity
      }
    )
    const {created, orderLine: cartLine} = res.data

    if (created) {
      dispatch(gotNewCartLine(cartLine))
    } else {
      dispatch(gotUpdatedCartLine(cartLine))
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateItemQuantityLocal = (
  productId,
  itemQuantity,
  from
) => async (dispatch, getState) => {
  const cart = getState().cart
  const cartLine = cart.find(cl => cl.productId === productId)
  let updatedCartLine = null
  let updatedCartForLS = null
  if (cartLine) {
    if (from === 'product') {
      updatedCartLine = {
        ...cartLine,
        itemQuantity: cartLine.itemQuantity + itemQuantity
      }
    } else if (from === 'cart') {
      updatedCartLine = {...cartLine, itemQuantity}
    }

    updatedCartForLS = cart.map(cl => {
      return cl.productId === productId ? updatedCartLine : {...cl}
    })

    dispatch(gotUpdatedCartLine(updatedCartLine))

    localStorage.setItem('cart', JSON.stringify(updatedCartForLS))
  } else {
    const nextCartLineId = Number(localStorage.getItem('nextCartId'))

    const newCartLine = {
      id: nextCartLineId,
      productId,
      itemQuantity,
      orderStatus: false
    }

    const res = await axios.get(`/api/products/${productId}`)
    const product = res.data

    const newCartLineWithProduct = {...newCartLine, product}

    dispatch(gotNewCartLine(newCartLineWithProduct))

    const newCartForLS = [...cart, newCartLineWithProduct]

    localStorage.setItem('cart', JSON.stringify(newCartForLS))

    localStorage.setItem('nextCartId', nextCartLineId + 1)
  }
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
    case GOT_NEW_CART_LINE:
      return [...state, action.cartLine]
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
