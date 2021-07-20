import React from 'react'
import { useSelector } from 'react-redux'
import { Favorite } from '../redux/favorites/favoritesTypes'
import { RootState } from '../redux/store'
import { FavoriteProductCard } from '../components/product/FavoriteProductCard'
import '../stylesheet/cart.scss'

export const FavoritesScreen: React.FC = () => {
	const favorites = useSelector((state: RootState) => state.favorites.favoriteItems)

    return (
        <React.Fragment>
          	<div className="cart-page favorite-page">
			  	{favorites?.length ? (
					<React.Fragment>
					<h1>ფავორიტები</h1>

					<div className="cart-list"> 
						<div className="top favorite">
							<div className="product-img"></div>
							<h2>პროდუქტის სახელი</h2>
							<h2>ერთეულის ფასი</h2>
							<h2>მარაგის სტატუსი</h2>
							<div className="cancel"></div>
						</div>

						{favorites.map((favorite: Favorite, index: number) => (
							<React.Fragment key={index}>
								<FavoriteProductCard favorite={favorite} />
							</React.Fragment>
						))}

					</div>
					</React.Fragment>
				) : (
                    <div className="empty-cart">
                        <h1>ფავორიტები ცარიელია</h1>
                        <img src="images/empty-favorite.svg" alt="" className="" />
                    </div>
                )}
          	</div>
        </React.Fragment>
    )
}