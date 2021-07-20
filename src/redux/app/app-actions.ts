import { 
    BANNER_LOAD_FAIL, BANNER_LOAD_SUCCESS, BRANDS_LOAD_SUCCESS, CLOSE_PRODUCT_QUICK_VIEW, 
    MAIN_CAROUSEL_LOAD_FAIL, MAIN_CAROUSEL_LOAD_SUCCESS, OPEN_PRODUCT_QUICK_VIEW, SECTION_LOAD_FAIL, 
    SECTION_LOAD_SUCCESS 
} from "./app-constants"
import { environment } from "../../environment/environment"
import { Section } from './ApplicationTypes'
import { toastr } from "react-redux-toastr"
import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { Product } from "../product/ProductTypes"
import { Brand, Banner, MainCarouselItem } from "./ApplicationTypes"
import axios, { AxiosResponse } from "axios"

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof SECTION_LOAD_SUCCESS; payload: Section[] }
    | { type: typeof OPEN_PRODUCT_QUICK_VIEW; payload: Product }
    | { type: typeof BRANDS_LOAD_SUCCESS; payload: Brand[] }
    | { type: typeof BANNER_LOAD_SUCCESS; payload: Banner[] }
    | { type: typeof MAIN_CAROUSEL_LOAD_SUCCESS; payload: MainCarouselItem[] }

export const setSections = (response: { success: boolean, data: Section[] }): ActionTypes => (
    { type: SECTION_LOAD_SUCCESS, payload: response.data }
)

export const setQuickViewProduct = (product: Product): ActionTypes => (
    { type: OPEN_PRODUCT_QUICK_VIEW, payload: product }
)

export const setBanners = (response: { success: boolean, banners: Banner[] }): ActionTypes => (
    { type: BANNER_LOAD_SUCCESS, payload: response.banners }
)

export const setMainCarousel = (response: { success: boolean, main_carousel: MainCarouselItem[] }): ActionTypes => (
    { type: MAIN_CAROUSEL_LOAD_SUCCESS, payload: response.main_carousel }
)

export const setBrands = (response: { success: boolean, brands: Brand[] }): ActionTypes => (
    { type: BRANDS_LOAD_SUCCESS, payload: response.brands }
)

/* ========== Axios Action Functions ========== */

export const openProductQuickViewModal = (product: Product): ActionMiddlewareType  => dispatch => {
    dispatch({ type: OPEN_PRODUCT_QUICK_VIEW, payload: product })
}

export const closeProductQuickViewModal = (): ActionMiddlewareType => dispatch => {
    dispatch({ type: CLOSE_PRODUCT_QUICK_VIEW, payload: null })
}

export const getMenu = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/rest_menu/sections')
        .then((response: AxiosResponse) => {
            dispatch(setSections(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "მთავარი მენიუს ჩატვირთვა ვერ მოხერხდა")
            dispatch({ type: SECTION_LOAD_FAIL })
        })
}

export const getBrands = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/rest_brands')
        .then((response: AxiosResponse) => {
            dispatch(setBrands(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "ბრენდების ჩატვირთვა ვერ მოხერხდა")
            dispatch({ type: SECTION_LOAD_FAIL })
        })
}

export const getMainCarousel = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/rest_main_carousel')
        .then((response: AxiosResponse) => {
            dispatch(setMainCarousel(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "მთავარი სლაიდერის ინფორმაციის ჩატვირთვა ვერ მოხერხდა.")
            dispatch({ type: MAIN_CAROUSEL_LOAD_FAIL })
        })
}

export const getBanners = (): ActionMiddlewareType => dispatch => {
    axios
        .get(environment.apiBaseURL + '/rest_banners')
        .then((response: AxiosResponse) => {
            dispatch(setBanners(response.data))
        })
        .catch(() => {
            toastr.error("დაფიქსირდა შეცდომა", "სარეკლამო ბანერების ჩატვირთვა ვერ მოხერხდა.")
            dispatch({ type: BANNER_LOAD_FAIL })
        })
}