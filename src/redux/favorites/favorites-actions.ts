import { FAVORITES_ADD_ITEM, FAVORITES_REMOVE_ITEM } from './favorites-constants'
import { ThunkAction } from 'redux-thunk'
import { AnyAction, Store } from 'redux'
import { Product } from '../product/ProductTypes'
import { Favorite } from './favoritesTypes'

/* ========== Action Types & Set Store Functions ========== */

export type ActionMiddlewareType = ThunkAction<void, Store, unknown, AnyAction>

export type ActionTypes = 
    | { type: typeof FAVORITES_ADD_ITEM; payload: Favorite }
    | { type: typeof FAVORITES_REMOVE_ITEM; payload: string }

export const setFavoriteInStore = (favorite: Favorite): ActionTypes => (
    { type: FAVORITES_ADD_ITEM, payload: favorite }
)

export const removeFavoriteFromStore = (id: string): ActionTypes => (
    { type: FAVORITES_REMOVE_ITEM, payload: id }
)


/* ========== Axios Action Functions ========== */

export const addToFavorite = (product: Product): ActionMiddlewareType => dispatch => {  
    dispatch(setFavoriteInStore({
        product: product._id,
        name: product.product_name,
        productCode: product.product_id,
        image: product.detailed_image_url,
        price: product.price,
        countInStock: product.quantity,
    }))
}

export const removeFromFavorite = (id: string): ActionMiddlewareType => dispatch => {
    dispatch(removeFavoriteFromStore(id))
}
