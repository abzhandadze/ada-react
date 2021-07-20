import { PRODUCTS_DEPARTMENTS_LOAD_FAIL, PRODUCTS_DEPARTMENTS_LOAD_SUCCESS, SAVE_PRODUCT_SUCCESS } from "./product-constants"
import { AnyAction } from "redux"
import { Pagination, Product, ProductsDepartment } from "./ProductTypes"

const lastSeenProducts = localStorage.getItem('lastSeenProducts')
const lastSeenProductsFromStorage: Product[] = lastSeenProducts ? JSON.parse(lastSeenProducts) : []

type InitialState = { products?: Product[]; departments: ProductsDepartment[]; pagination?: Pagination, lastSeenProducts: Product[] }

const initialState: InitialState = {
    products: [],
    departments: [],
    pagination: {},
    lastSeenProducts: lastSeenProductsFromStorage
}

export const ProductReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCTS_DEPARTMENTS_LOAD_SUCCESS:
            return { ...state, departments: payload } 
        case PRODUCTS_DEPARTMENTS_LOAD_FAIL:
            return { ...state, departments: [] }
        case SAVE_PRODUCT_SUCCESS:
            let existsProduct = state.lastSeenProducts.some((product: Product) => product._id === payload._id)

            let newlastSeenProducts

            if (!existsProduct) {
                newlastSeenProducts = [...state.lastSeenProducts, payload].slice(Math.max([...state.lastSeenProducts, payload].length - 20, 0))

                localStorage.setItem('lastSeenProducts', JSON.stringify(newlastSeenProducts))
            }

            return { ...state, lastSeenProducts: !existsProduct ? newlastSeenProducts : state.lastSeenProducts }
        default:
            return state
    }
}