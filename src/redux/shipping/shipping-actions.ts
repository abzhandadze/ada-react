import { SAVE_SHIPPING_INFORMATION_SUCCESS } from './shipping-constants'
import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { ShippingInformation } from './ShippingTypes'

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof SAVE_SHIPPING_INFORMATION_SUCCESS; payload: ShippingInformation }

export const setSavedShippingInformation = (shippingInformation: ShippingInformation): ActionTypes => (
    { type: SAVE_SHIPPING_INFORMATION_SUCCESS, payload: shippingInformation}
)

/* ========== Axios Action Functions ========== */

export const saveShippingInformation = (importedInfo: ShippingInformation): ActionMiddlewareType => dispatch => {
    dispatch(setSavedShippingInformation(importedInfo))
}