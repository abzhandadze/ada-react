import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from "./auth-constants"
import { AnyAction } from "redux"
import { User } from "./AuthenticationTypes"

type InitialState = { token?: string | null; isAuthenticated?: boolean, user: User | null }

const initialState: InitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
}

export const AuthenticationReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
                localStorage.setItem('token', payload)
                return {
                    ...state,
                    token: payload,
                    isAuthenticated: true,
                }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}