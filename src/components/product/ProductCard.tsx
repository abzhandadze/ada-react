import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { environment } from '../../environment/environment'
import { openProductQuickViewModal } from '../../redux/app/app-actions'
import { Product } from '../../redux/product/ProductTypes'
import { AddToCartButton } from '../buttons/AddToCartButton'
import { AddToFavoriteButton } from '../buttons/AddToFavoriteButton'

export const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch()

    const showMoreDetails = () => {
        dispatch(openProductQuickViewModal(product))
    }

    return (
        <React.Fragment>
            <div className="product-item" >
                <AddToFavoriteButton product={product} />

                <div className="eye-btn" onClick={showMoreDetails} >
                    <i className="far fa-eye"></i>
                </div>
                
                <Link to={`/products/${product._id}`}>
                    <img src={environment.imageBaseURL + product?.image_url}  alt=""/>
                </Link>

                <Link to={`/products/${product._id}`}>
                    <span>{product.Store}</span>
                    <h2>{product.product_name}</h2>
                </Link>

                <div className="price">
                    <p>{product.price}  ₾</p>
                    <span>{product.price - 50} ₾</span>
                </div>

                <AddToCartButton quantityNumber={1} product={product} />
            </div>
        </React.Fragment>
    )
}