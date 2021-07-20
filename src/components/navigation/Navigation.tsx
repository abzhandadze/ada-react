import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { CartIcon, FavoriteIcon } from '../../animations/SvgFiles'
import { logout } from '../../redux/authentication/auth-actions'
import { RootState } from '../../redux/store'
import './navigation.scss'

export const Navigation = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const { favoriteItems } = useSelector((state: RootState) => state.favorites)
    const { cartItems } = useSelector((state: RootState) => state.cart)
    
    const dispatch = useDispatch()
    const history = useHistory()

   
    const logoutFunction = async () => {
        await dispatch(logout())

        history.push("/")
    }

    return (
        <React.Fragment>
            <header className="header">
                <div className="header-top">
                    <div className="container"> 
                        <p>მოგესალმებით ტექნიკის მაღაზიაში</p>

                        <ul className="hdr-right">
                            {isAuthenticated ? (
                                <>
                                    <li className="user active">
                                        <Link to="/profile">
                                            <i className="fas fa-user-circle"></i>გამარჯობა, {user?.name?.split(' ')[0]}
                                        </Link>
                                    </li>

                                    <button className="logout active" onClick={logoutFunction}>
                                        <Link to="/logout">გამოსვლა</Link>
                                    </button>
                                </>
                            ) : (
                                <li className="reg-sign active">
                                    <p>
                                        <Link className="registration-btn" to="/registration">რეგისტრაცია </Link>
                                        ან
                                        <Link className="signin-btn" to="/login"> ავტორიზაცია</Link>
                                    </p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="header-middle">
                    <div className="container">
                        <Link className="logo" to="/">
                            <img src="/images/logo.png" alt=""/>
                        </Link>

                        <div className="hotline">
                            <img src="/images/icon-phone.png" alt=""/>
                            <div> 
                                <p>დაგვირეკეთ:</p>
                                <Link to="06-900-6789-00">06-900-6789-00</Link>
                            </div>
                        </div>

                        <form className="search" action="">
                            <input type="text" placeholder="ძებნა..."/>
                            <button type="submit">ძებნა</button>

                            <div className="box">
                                <Link to=""> 
                                    <figure><img src="img1/1.png" alt=""/></figure>
                                    <h2>Apple 12.9 iPad Pro (Mid 2017, 512GB)</h2>
                                </Link>

                                <Link to=""> 
                                    <figure><img src="img1/2.png" alt=""/></figure>
                                    <h2>Apple 12.9 iPad Pro A13</h2>
                                </Link>
                            </div>
                        </form>

                        <div className="favorites-cart">
                            
                            <NavLink className="favorites" to="/favorites">
                                <span>{favoriteItems.length}</span>
                                <FavoriteIcon />
                                <p>ფავორიტები</p>
                            </NavLink>
                            
                            <NavLink className="cart" to="/cart">
                                <span>{cartItems.length}</span>
                                <CartIcon />
                                <p>შენი კალათა</p>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="container">
                        <nav className="menu">
                            <NavLink exact to="/">მთავარი</NavLink>
                            <NavLink  to="/about">ჩვენ შესახებ</NavLink>
                            <NavLink  to="/contact">კონტაქტი</NavLink>
                        </nav>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}