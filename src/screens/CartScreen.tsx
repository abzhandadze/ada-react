import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartProductCard } from '../components/product/CartProductCard'
import { Cart } from '../redux/cart/CartTypes'
import { clearCart } from '../redux/cart/cart-actions'
import { RootState } from '../redux/store'
import { ConfirmButton } from '../components/buttons/ConfirmButton'
import '../stylesheet/cart.scss'

export const CartScreen: React.FC = () => {
    const carts = useSelector((state: RootState) => state.cart.cartItems)
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [totalItems, setTotalItems] = React.useState(0)

    const dispatch = useDispatch()

    React.useEffect(() => {
        setTotalPrice(
            carts.reduce((acc: any, cart: Cart) => acc + cart.quantity * cart.amount, 0).toFixed(2)
        )

        setTotalItems(
            carts.reduce((acc: any, cart: Cart) => acc + cart.quantity, 0)
        )
    }, [carts])

    const handleClearCart = async () => {
        await dispatch(clearCart())

        window.scrollTo(0, 0)
    }
    
    return (
        <React.Fragment>
            <div className="cart-page">
                {carts?.length ? (
                    <React.Fragment>
                        <h1>კალათა</h1>
                        <div className="cart-list"> 
                            <div className="top"> 
                                <h2>პროდუქტი</h2>
                                <div className="product-img"></div>
                                <h2>ერთეულის ფასი</h2>
                                <h2>რაოდენობა</h2>
                                <h2>ჯამური ფასი</h2>
                                <div className="cancel"></div>
                            </div>
                            
                            {carts.map((cart: Cart, index: number) => (
                                <React.Fragment key={index}>
                                    <CartProductCard cart={cart} />
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="cart-bottom">
                            <ConfirmButton 
                                buttonFucntion={() => handleClearCart()} 
                                buttonTitle={"კალათის გასუფთავება"} 
                                buttonClassname={"clear-cart"} 
                                question={"ნამდვილად გსურთ კალათის გასუფთავება?"}
                            />

                            <div className="box">
                                <h2 className="subtotal">ჯამური ფასი :<span>{totalPrice} ₾</span></h2>
                                <h2 className="subtotal">ნივთების რაოდენობა :<span>{totalItems}</span></h2>
                                <Link className="continue" to="/checkout">გაგრძელება</Link>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="empty-cart">
                        <h1>კალათა ცარიელია</h1>
                        <img src="images/empty-cart.svg" alt="" className="" />
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}