import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { GET_MY_ORDERS_FAIL, GET_MY_ORDERS_SUCCESS } from './order-constants'
import { CART_CLEAR_ITEMS } from '../cart/cart-constants'
import { Order } from './OrderTypes'
import { History, LocationState } from "history"
import { environment } from '../../environment/environment'
import { toastr } from 'react-redux-toastr'
import axios, { AxiosError, AxiosResponse } from 'axios'

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof GET_MY_ORDERS_SUCCESS; payload: { orders_count: number, orders: Order[]} }

export const setMyOrders = (response: { orders_count: number, orders: Order[] }): ActionTypes => (
    { type: GET_MY_ORDERS_SUCCESS, payload: { orders_count: response.orders_count, orders: response.orders } }
)

/* ========== Axios Action Functions ========== */

export const getMyOrders = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/orders')
        .then((response: AxiosResponse) => {
            dispatch(setMyOrders(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "თქვენი შეკვეთები ვერ ჩაიტვირთა")
            dispatch({ type: GET_MY_ORDERS_FAIL })
        })
}

export const createOrder = (order: Order,  history: History<LocationState>): ActionMiddlewareType => dispatch => {
    const { user, order_items, shipping_address, payment_method, shipping_price, total_price } = order

    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ user, order_items, shipping_address, payment_method, shipping_price, total_price })

    axios
        .post(environment.apiBaseURL + '/orders', body, config)
        .then((response: AxiosResponse) => {
            if (response.data.success === true) {
                dispatch({ type: CART_CLEAR_ITEMS })
                history.push('/profile')
                toastr.info("ADASHOPGE", "შეკვეთა გაკეთებულია, ჩვენ მალე დაგიკავშირდებით")
            } 
        })
        .catch((error: AxiosError) => {
            toastr.error("დაფიქსირდა შეცდომა", "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
        })
}