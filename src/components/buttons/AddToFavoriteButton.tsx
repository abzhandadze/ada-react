import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite } from '../../redux/favorites/favorites-actions'
import { Favorite } from '../../redux/favorites/favoritesTypes'
import { Product } from '../../redux/product/ProductTypes'
import { RootState } from '../../redux/store'

export const AddToFavoriteButton = ({ product }: { product: Product }) => {
    const favorites = useSelector((state: RootState) => state.favorites.favoriteItems)
    const inFavorites = favorites.some((favorite: Favorite) => favorite.product === product._id)

    const dispatch = useDispatch()

    const addToFavoriteItems = (product: Product) => {
		dispatch(addToFavorite(product))
	}

    return (
        <React.Fragment>
            <button className={inFavorites ? "add-favorite link active" : "add-favorite link"} onClick={() => addToFavoriteItems(product)}>
                <i className={inFavorites ? "fas fa-heart" : "far fa-heart"}></i>
            </button>
        </React.Fragment>
    )
}