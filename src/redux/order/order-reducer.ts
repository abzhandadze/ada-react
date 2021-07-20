import { GET_MY_ORDERS_SUCCESS } from './order-constants'
import { AnyAction } from 'redux'
import { Order } from './OrderTypes'

type InitialState = { orders: Order[], my_orders_count: number }

const initialState: InitialState = { orders: [], my_orders_count: 0 }

export const OrderReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case GET_MY_ORDERS_SUCCESS:
            return { ...state, orders: payload.orders, my_orders_count: payload.orders_count }
        default:
            return state
    }
}