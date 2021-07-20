import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { environment } from '../../environment/environment'
import { removeFromFavorite } from '../../redux/favorites/favorites-actions'
import { Favorite } from '../../redux/favorites/favoritesTypes'

export const FavoriteProductCard = ({ favorite }: { favorite: Favorite}) => {
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <div className="item favorite">
                <Link to={`/products/${favorite.product}`} className="productImg">
                    <img src={environment.imageBaseURL + favorite.image} alt=""/>
                </Link>

                <Link to={`/products/${favorite.product}`}><span>#{favorite.productCode}</span>{favorite.name}</Link>
                <p className="price">{favorite.price.toFixed(2)} ₾<span>ერთეულის ფასი</span></p>
                <p className="stock-status"> {favorite.countInStock > 0? 'მარაგშია' : 'მარაგში არ არის'} <span>მარაგის სტატუსი</span></p>
                <i className="fas fa-times cancel" onClick={() => dispatch(removeFromFavorite(favorite.product))}></i>
            </div>
        </React.Fragment>
    )
}