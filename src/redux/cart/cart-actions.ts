import { CART_ADD_ITEM, CART_CHANGE_QUANTITY, CART_CLEAR_ITEMS, CART_REMOVE_ITEM } from './cart-constants'
import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { Product } from '../product/ProductTypes'
import { Cart } from './CartTypes'

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof CART_ADD_ITEM; payload: Cart }
    | { type: typeof CART_REMOVE_ITEM; payload: string }
    | { type: typeof CART_CHANGE_QUANTITY; payload: object }
    | { type: typeof CART_CLEAR_ITEMS }

export const setCartInStore = (cart: Cart): ActionTypes => (
    { type: CART_ADD_ITEM, payload: cart }
)

export const removeCartFromStore = (id: string): ActionTypes => (
    { type: CART_REMOVE_ITEM, payload: id }
)

export const setChangedQuantity = (id: string, quantity: number): ActionTypes => (
    { type: CART_CHANGE_QUANTITY, payload: { id, quantity } }
)

export const clearCartInStore = (): ActionTypes => (
    { type: CART_CLEAR_ITEMS }
)

/* ========== Axios Action Functions ========== */

export const addToCart = (product: Product, quantity: number): ActionMiddlewareType => dispatch => {  
    dispatch(setCartInStore({
        product_id: product._id,
        description: product.meta_desc,
        name: product.product_name,
        product_code: product.product_id,
        image: product.detailed_image_url,
        amount: product.price,
        quantity: quantity,
        product_quantity: product.quantity
    }))
}

export const changeCartQuantity = (id: string, quantity: number): ActionMiddlewareType => dispatch => {
    dispatch(setChangedQuantity(id, quantity))
}

export const removeFromCart = (id: string): ActionMiddlewareType => dispatch => {
    dispatch(removeCartFromStore(id))
}

export const clearCart = (): ActionMiddlewareType => dispatch => {
    dispatch(clearCartInStore())
}