import { SAVE_SHIPPING_INFORMATION_SUCCESS } from './shipping-constants'
import { AnyAction } from 'redux'
import { ShippingInformation } from './ShippingTypes'

type InitialState = { shippingInformation: ShippingInformation }

const storageShippingInfo = localStorage.getItem('shippingInformation')
const shippingInfoFromStorage: ShippingInformation = storageShippingInfo ? JSON.parse(storageShippingInfo) : []

const initialState: InitialState = { shippingInformation: shippingInfoFromStorage}

export const ShippingReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case SAVE_SHIPPING_INFORMATION_SUCCESS:
            localStorage.setItem('shippingInformation', JSON.stringify(payload))

            return { ...state, shippingInformation: payload }
        default:
            return state
    }
}