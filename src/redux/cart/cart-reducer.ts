import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR_ITEMS, CART_CHANGE_QUANTITY } from './cart-constants'
import { AnyAction } from 'redux'
import { Cart } from './CartTypes'

type InitialState = { cartItems: Cart[] }

const storageCartItems = localStorage.getItem('cartItems')
const cartFromStorage = storageCartItems ? JSON.parse(storageCartItems) : []

const initialState: InitialState = { cartItems: cartFromStorage }

export const CartReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case CART_ADD_ITEM:
            const item: Cart = payload

            const existItem = state.cartItems.find((cart: Cart) => cart.product_id === item.product_id)

            if (existItem) {
                localStorage.setItem('cartItems', JSON.stringify(
                    state.cartItems.map((cart: Cart) => cart.product_id === existItem.product_id ? item : cart)
                ))

                return {
                    ...state,
                    cartItems: state.cartItems.map((cart: Cart) => cart.product_id === existItem.product_id ? item : cart)
                }
            } else {
                localStorage.setItem('cartItems', JSON.stringify(
                    [ ...state.cartItems, item ]
                ))

                return {
                    ...state,
                    cartItems: [ ...state.cartItems, item ]
                }
            }
        case CART_CHANGE_QUANTITY:
            localStorage.setItem('cartItems', JSON.stringify(
                state.cartItems.map((cart: Cart) => cart.product_id === payload.id ? (
                    { ...cart, quantity: payload.quantity }
                ) : cart)
            ))

            return {
                ...state,
                cartItems: state.cartItems.map((cart: Cart) => cart.product_id === payload.id ? (
                    {...cart, quantity: payload.quantity}
                ) : cart)
            }
        case CART_REMOVE_ITEM:
            localStorage.setItem('cartItems', JSON.stringify(
                state.cartItems.filter((cart: Cart) => cart.product_id !== payload)
            ))

            return {
                ...state,
                cartItems: state.cartItems.filter((cart: Cart) => cart.product_id !== payload)
            }
        case CART_CLEAR_ITEMS:
            localStorage.removeItem('cartItems')

            return { ...state, cartItems: [] }
        default:
            return state
    }
}