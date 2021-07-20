import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from './auth-constants'
import { environment } from '../../environment/environment'
import { User } from './AuthenticationTypes'
import { toastr } from 'react-redux-toastr'
import { setAuthToken } from '../../utils/set-auth-token'
import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { History, LocationState } from "history"
import axios, { AxiosError, AxiosResponse } from 'axios'

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof USER_LOADED; payload: User }
    | { type: typeof REGISTER_SUCCESS; payload: string }
    | { type: typeof LOGIN_SUCCESS; payload: string }

export const setUser = (response: { success: boolean, data: User }): ActionTypes => (
    { type: USER_LOADED, payload: response.data }
)

export const setRegisterToken = (token: string): ActionTypes => (
    { type: REGISTER_SUCCESS, payload: token }
)

export const setLoginToken = (token: string): ActionTypes => (
    { type: LOGIN_SUCCESS, payload: token }
)

/* ========== Axios Action Functions ========== */

export const getUser = (history?: History<LocationState>): ActionMiddlewareType => dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    axios
        .get(environment.apiBaseURL + '/authentication/me')
        .then(async(response: AxiosResponse) => {
            dispatch(setUser(response.data))
            if (history)  {
                history.push('/')
                toastr.info(`გამარჯობა ${response.data.data.name.split(' ')[0]}`, "ჩვენ ყოველთვის გვიხარია შენი სტუმრობა ჩვენს ონლაინ მაღაზიაში.")
            }
        })
        .catch((error: AxiosError) => {
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error)
            dispatch({ type: AUTH_ERROR })
        })
}

export const registration = (name: string, email: string, password: string, history: History<LocationState>): ActionMiddlewareType => async dispatch => {
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ name, email, password })

    axios
        .post(environment.apiBaseURL + '/authentication/register', body, config)
        .then((response: AxiosResponse) => {
            dispatch(setRegisterToken(response?.data?.token))
            dispatch(getUser(history))
        })
        .catch((error: AxiosError) => {
            history.push('/registration')
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error || "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
            dispatch({ type: REGISTER_FAIL })
        })
}

export const login = (email: string, password: string, history: History<LocationState>): ActionMiddlewareType => async dispatch => {
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ email, password })

    axios
        .post(environment.apiBaseURL + '/authentication/login', body, config)
        .then((response: AxiosResponse) => {
            dispatch(setLoginToken(response.data?.token))
            dispatch(getUser(history))
        })
        .catch((error: AxiosError) => {
            history.push('/login')
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error || "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
            dispatch({ type: LOGIN_FAIL })
        })
}

export const logout = (): ThunkAction<void, Store, unknown, AnyAction> => dispatch => {
    dispatch({ type: LOGOUT })
}

export const forgotPassword = (email: string, history: History<LocationState>): ActionMiddlewareType => () => {
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ email })

    axios
        .post(environment.apiBaseURL + '/authentication/forgot_password', body, config)
        .then((response: AxiosResponse) => {
            history.push('/')
            toastr.info("ADASHOPGE", response.data?.message)
        })
        .catch((error: AxiosError) => {
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error || "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
        })
}

export const resetPassword = (newPassword: string, history: History<LocationState>, resettoken: string): ActionMiddlewareType => () => {
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ newPassword })

    axios
        .put(environment.apiBaseURL + `/authentication/reset_password/${resettoken}`, body, config)
        .then(() => {
            history.push('/login')
            toastr.info("ADASHOPGE", "პაროლი წარმატებით შეიცვალა, შეგიძლიათ ახალი პაროლით შემოხვიდეთ ჩვენ მაღაზიაში.")
        })
        .catch((error: AxiosError) => {
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error || "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
        })
}



export const updatePassword = (currentPassword: string, newPassword: string): ActionMiddlewareType => () => {
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify({ newPassword, currentPassword })

    axios
        .put(environment.apiBaseURL + `/authentication/update_password/`, body, config)
        .then((response: AxiosResponse) => {
            toastr.info("ADASHOPGE", response.data.status ? "პაროლი წარმატებით შეიცვალა" : "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
        })
        .catch((error: AxiosError) => {
            toastr.error("დაფიქსირდა შეცდომა", error.response?.data?.error || "გაუთვალისწინებელი შეცდომა, ბოდიშს გიხდით შეფერხებისთვის.")
        })
}