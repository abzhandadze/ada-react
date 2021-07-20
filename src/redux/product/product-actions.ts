import { PRODUCTS_DEPARTMENTS_LOAD_FAIL, PRODUCTS_DEPARTMENTS_LOAD_SUCCESS, SAVE_PRODUCT_SUCCESS } from "./product-constants"
import { environment } from "../../environment/environment"
import { Product, ProductsDepartment } from './ProductTypes'
import { toastr } from "react-redux-toastr"
import { ThunkAction } from "redux-thunk"
import { AnyAction, Store } from "redux"
import axios, { AxiosResponse } from "axios"

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof PRODUCTS_DEPARTMENTS_LOAD_SUCCESS; payload: ProductsDepartment }
    | { type: typeof SAVE_PRODUCT_SUCCESS; payload: Product }

export const setProductsDepartments = (
    response: { success: boolean, products_departments: ProductsDepartment }
): ActionTypes => (
    { type: PRODUCTS_DEPARTMENTS_LOAD_SUCCESS, payload: response.products_departments }
)

export const setSavedProduct = (product: Product): ActionTypes => (
    { type: SAVE_PRODUCT_SUCCESS, payload: product }
)

/* ========== Axios Action Functions ========== */

export const getProductsDepartments = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/products/departments')
        .then((response: AxiosResponse) => {
            dispatch(setProductsDepartments(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "პროდუქტების დეპარტამენტები ვერ ჩაიტვირთა.")
            dispatch({ type: PRODUCTS_DEPARTMENTS_LOAD_FAIL })
        })
}

export const saveProduct = (product: Product): ActionMiddlewareType => dispatch => {
    dispatch(setSavedProduct(product))
}