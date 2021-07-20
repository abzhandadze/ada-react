import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { environment } from '../../environment/environment'
import { openProductQuickViewModal } from '../../redux/app/app-actions'
import { AddToFavoriteButton } from '../buttons/AddToFavoriteButton'

export const SmallProductCard = ({ product }: any) => {
    const dispatch = useDispatch()

    const showMoreDetails = () => {
        dispatch(openProductQuickViewModal(product))
    }

    return (
        <React.Fragment>
            <button className="eye-btn" onClick={showMoreDetails}>
                <i className="far fa-eye"></i>
            </button>
            <AddToFavoriteButton product={product} />
            
            <Link to={`/products/${product._id}`}>
                <img src={environment.imageBaseURL + product?.image_url} alt=""/>

                <div className="text">
                    <span>{product?.supplier_name}</span>
                    <h2>{product?.product_name}</h2>

                    <div className="price"> 
                        <p>{product?.price} ₾</p>
                        <span>{(product?.price - 50).toFixed(2)} ₾</span>
                    </div>
                </div>
            </Link>
        </React.Fragment>
    )
}


