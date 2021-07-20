import { FAVORITES_ADD_ITEM, FAVORITES_REMOVE_ITEM } from './favorites-constants'
import { AnyAction } from 'redux'
import { Favorite } from './favoritesTypes'


const storageFavoriteItems = localStorage.getItem('favoriteItems')
const favoritesFromStorage: Favorite[] = storageFavoriteItems ? JSON.parse(storageFavoriteItems) : []

type InitialState = { favoriteItems: Favorite[] }

const initialState: InitialState = { favoriteItems: favoritesFromStorage }

export const FavoritesReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case FAVORITES_ADD_ITEM:
            const item: Favorite = payload

            const existItem = state.favoriteItems.find((favorite: Favorite) => favorite.product === item.product)

            if (existItem) {
                localStorage.setItem('favoriteItems', JSON.stringify(
                    state.favoriteItems.filter((favorite: Favorite) => favorite.product !== existItem.product)
                ))

                return {
                    ...state,
                    favoriteItems: state.favoriteItems.filter((favorite: Favorite) => favorite.product !== existItem.product)
                }
            } else {
                localStorage.setItem('favoriteItems', JSON.stringify(
                    [ ...state.favoriteItems, item ]
                ))

                return {
                    ...state,
                    favoriteItems: [ ...state.favoriteItems, item ]
                }
            }
       
        case FAVORITES_REMOVE_ITEM:
            localStorage.setItem('favoriteItems', JSON.stringify(
                state.favoriteItems.filter((favorite: Favorite) => favorite.product !== payload)
            ))

            return {
                ...state,
                favoriteItems: state.favoriteItems.filter((favorite: Favorite) => favorite.product !== payload)
            }
        default:
            return state
    }
}