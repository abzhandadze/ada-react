import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { closeProductQuickViewModal } from '../../../redux/app/app-actions'
import { Product } from '../../../redux/product/ProductTypes'
import { ProductQuantity } from '../../product/ProductQuantity'
import { AddToCartButton } from '../../buttons/AddToCartButton'
import { Cart } from '../../../redux/cart/CartTypes'
import { RootState } from '../../../redux/store'
import { ThumbSliderModal } from '../../carousels/thumbCarousel/ThumbCarousel'
import { AddToFavoriteButton } from '../../buttons/AddToFavoriteButton'
import '../../../../node_modules/swiper/swiper-bundle.css'
import "./quickViewModal.scss"

interface QuickViewProps { product: Product }

export const QuickView = ({ product }: QuickViewProps) => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    const [quantityNumber, setQuantityNumber] = React.useState(0)

    const history = useHistory()
    
    React.useEffect(() => {
		const inCart = cartItems.filter((cart: Cart) => cart.product_id === product?._id)

		if (inCart?.length) {
			setQuantityNumber(inCart[0].quantity)
		}

	}, [product, cartItems])

    const dispatch = useDispatch()

    const closeQuickViewModal = async (product_id?: string) => {
        await dispatch(closeProductQuickViewModal())

        if (product_id) {
            history.push(`/products/${product._id}`)
        }
    }

    const closeQuickViewModalOnEscape = () => {
        function onKeyup(event: any) {
            if (event.key === 'Escape') closeQuickViewModal()
        }

        window.addEventListener('keyup', onKeyup)
    }

    closeQuickViewModalOnEscape()
    
    return (
        <React.Fragment>
            <div className="quick-view active">
                <div className="bg" onClick={() => closeQuickViewModal()}></div>
                <i className="fas fa-times"  onClick={() => closeQuickViewModal()}></i>

                <div className="box"> 
                    <ThumbSliderModal product={product}/>

                    <div className="right">
                        <div onClick={() => closeQuickViewModal(product._id)}>
                            <h1>{product.product_name}</h1>
                        </div>

                        <div className="in-stock">
                            {product.quantity === 0 ? (
                                <i className="fas fa-times"></i>
                            ) : (
                                <i className="fas fa-check"></i>
                            )}
                            
                            <p>{product.quantity === 0 ? "მარაგში არ არის" : "მარაგშია"}</p>
                        </div>

                        <p>მომწოდებელი: {product.supplier_name}</p>

                        <div className="price"> 
                            <p>{product.price} ₾</p><span>{(product.price + 50).toFixed(2)} ₾</span>
                        </div>

                        <ul> 
                            {product.product_section && (
                                <li>
                                    <p>სექცია: <span>{product.product_section}</span></p>
                                </li>
                            )}

                            {product.product_category && (
                                <li>
                                    <p>კატეგორია: <span>{product.product_category}</span></p>
                                </li>
                            )}

                            {product.product_sub_category && (
                                <li>
                                    <p>ქვე კატეგორია: <span>{product.product_sub_category}</span></p>
                                </li>
                            )}

                            {product.weight && (
                                <li>
                                    <p>წონა: <span>{product.weight} კილოგრამი</span></p>
                                </li>
                            )}
                        </ul>

                        <div className="spiner-add"> 
                            <ProductQuantity
                                productId={product._id} 
                                setQuantityNumber={setQuantityNumber} 
                                quantityNumber={quantityNumber}
                                productQuantity={product.quantity} 
                            />

                            <AddToCartButton quantityNumber={quantityNumber} product={product} />

                            <AddToFavoriteButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}