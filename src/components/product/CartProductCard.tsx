import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { environment } from '../../environment/environment'
import { removeFromCart } from '../../redux/cart/cart-actions'
import { Cart } from '../../redux/cart/CartTypes'
import { ProductQuantity } from './ProductQuantity'

export const CartProductCard = ({ cart }: { cart: Cart}) => {
    const [totalPrice, setTotalPrice] = React.useState(cart.quantity * cart.amount)
    const [quantityNumber, setQuantityNumber] = React.useState(cart.quantity)

    const dispatch = useDispatch()

    React.useEffect(() => {
        setTotalPrice(quantityNumber * cart.amount)
    }, [quantityNumber, cart])

    return (
        <React.Fragment>
            <div className="item">
                <Link to={`/products/${cart.product_id}`} className="productImg"><img src={environment.imageBaseURL + cart.image} alt=""/></Link>
                <Link to={`/products/${cart.product_id}`}><span>#{cart.product_code}</span>{cart.name}</Link>
                <p className="price">{cart.amount.toFixed(2)}  ₾<span>ერთეულის ფასი</span></p>

                <ProductQuantity 
                    productQuantity={cart.product_quantity} 
                    quantityNumber={quantityNumber} 
                    setQuantityNumber={setQuantityNumber}
                    productId={cart.product_id} 
                />

                <p className="total-price">{totalPrice.toFixed(2)}  ₾<span>ჯამური ფასი</span></p>
                <i className="fas fa-times cancel" onClick={() => dispatch(removeFromCart(cart.product_id))}></i>
            </div>
        </React.Fragment>
    )
}
